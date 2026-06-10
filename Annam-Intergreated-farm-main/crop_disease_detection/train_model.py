# crop_disease_detection/train_model.py

import os
import shutil
import json
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw

import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from sklearn.metrics import classification_report, confusion_matrix

# Define path configurations
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "dataset")
SPLIT_DIR = os.path.join(BASE_DIR, "dataset_split")
MODELS_DIR = os.path.join(BASE_DIR, "models")
PLOTS_DIR = os.path.join(BASE_DIR, "plots")

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 15

def ensure_directories():
    """Ensure directory structure exists."""
    for folder in [MODELS_DIR, PLOTS_DIR]:
        os.makedirs(folder, exist_ok=True)

def generate_mock_dataset():
    """
    Generates a small mock dataset of synthetic leaves if the dataset folder doesn't match our target classes.
    This enables running the training script out of the box for testing with custom classes.
    """
    print("\n--- Checking Dataset Folder ---")
    
    expected_classes = [
        "Tomato___Early_blight", "Tomato___healthy",
        "Papaw___Anthracnose", "Papaw___healthy",
        "Coconut___Bud_rot", "Coconut___healthy",
        "Paddyfield___Blast", "Paddyfield___healthy"
    ]
    
    # Check if dataset exists and matches our expected classes
    should_generate = True
    if os.path.exists(DATASET_DIR):
        subdirs = [d for d in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, d))]
        if set(subdirs) == set(expected_classes):
            print(f"Found existing dataset with matching classes: {subdirs}")
            should_generate = False
        else:
            print(f"Dataset subdirs {subdirs} do not match target classes. Cleaning and regenerating...")
            shutil.rmtree(DATASET_DIR, ignore_errors=True)
            
    if not should_generate:
        return False

    print("Generating a synthetic mock dataset for Tomato, Papaw, Coconut, and Paddyfield...")
    os.makedirs(DATASET_DIR, exist_ok=True)
    
    num_samples = 40  # 40 images per class for a fast test run
    
    for cls in expected_classes:
        cls_path = os.path.join(DATASET_DIR, cls)
        os.makedirs(cls_path, exist_ok=True)
        
        for i in range(num_samples):
            # Create a base light-grey canvas
            img = Image.new("RGB", (256, 256), color=(240, 240, 240))
            draw = ImageDraw.Draw(img)
            
            if "Tomato" in cls:
                # Tomato leaf: Green ellipse
                draw.ellipse([40, 60, 216, 196], fill=(34, 139, 34)) # Forest Green
                if cls == "Tomato___Early_blight":
                    # Concentric early blight spots
                    draw.ellipse([80, 100, 110, 130], fill=(139, 69, 19)) # Brown
                    draw.ellipse([85, 105, 105, 125], fill=(218, 165, 32)) # Yellow
                    draw.ellipse([140, 110, 165, 135], fill=(139, 69, 19))
                    draw.ellipse([143, 113, 162, 132], fill=(218, 165, 32))
                    
            elif "Papaw" in cls:
                # Papaw (Papaya) leaf: A large star-like 7-lobed polygon
                points = [
                    (128, 128), (128, 30), (140, 90), (210, 70), (155, 120),
                    (226, 140), (150, 150), (180, 210), (128, 160), (76, 210),
                    (106, 150), (30, 140), (101, 120), (46, 70), (116, 90)
                ]
                draw.polygon(points, fill=(46, 117, 89)) # Medium Green
                if cls == "Papaw___Anthracnose":
                    # Anthracnose: Dark brown/black spots
                    draw.ellipse([110, 70, 120, 80], fill=(40, 26, 13))
                    draw.ellipse([150, 100, 165, 115], fill=(40, 26, 13))
                    draw.ellipse([80, 130, 92, 142], fill=(40, 26, 13))
                    
            elif "Coconut" in cls:
                # Coconut leaf: Long narrow leaflet
                points = [(20, 220), (30, 230), (236, 40), (230, 30)]
                draw.polygon(points, fill=(34, 177, 76)) # Bright Green
                if cls == "Coconut___Bud_rot":
                    # Bud rot: Yellowing/browning rotting tip
                    draw.polygon([(180, 75), (236, 40), (230, 30), (175, 65)], fill=(139, 69, 19)) # Brown
                    draw.polygon([(150, 95), (180, 75), (175, 65), (145, 85)], fill=(218, 165, 32)) # Yellow
                    
            elif "Paddyfield" in cls:
                # Paddyfield (Rice) leaf: Very slender blade
                points = [(10, 240), (30, 246), (246, 20), (240, 10)]
                draw.polygon(points, fill=(107, 142, 35)) # Olive Green
                if cls == "Paddyfield___Blast":
                    # Blast: Spindle-shaped gray spots with brown borders
                    draw.polygon([(100, 120), (115, 110), (130, 120), (115, 130)], fill=(165, 42, 42)) # Brown border
                    draw.polygon([(105, 120), (115, 115), (125, 120), (115, 125)], fill=(211, 211, 211)) # Grey center
                    draw.polygon([(160, 70), (170, 62), (180, 70), (170, 78)], fill=(165, 42, 42))
                    draw.polygon([(163, 70), (170, 66), (177, 70), (170, 74)], fill=(211, 211, 211))
            
            # Save the image
            img.save(os.path.join(cls_path, f"leaf_{i}.jpg"))
            
    print(f"Mock dataset generated successfully at: {DATASET_DIR}")
    return True


def split_dataset(train_ratio=0.8, val_ratio=0.1, test_ratio=0.1):
    """
    Splits the raw dataset in dataset/ into train, val, and test subsets
    under dataset_split/ to keep the raw dataset untouched.
    """
    print("\n--- Splitting Dataset ---")
    
    # Clean previous split if exists
    if os.path.exists(SPLIT_DIR):
        print(f"Removing old split directory: {SPLIT_DIR}")
        shutil.rmtree(SPLIT_DIR)
        
    os.makedirs(SPLIT_DIR, exist_ok=True)
    
    classes = [d for d in os.listdir(DATASET_DIR) if os.path.isdir(os.path.join(DATASET_DIR, d))]
    
    for cls in classes:
        cls_src = os.path.join(DATASET_DIR, cls)
        files = [f for f in os.listdir(cls_src) if os.path.isfile(os.path.join(cls_src, f))]
        
        # Shuffle files
        np.random.seed(42)
        np.random.shuffle(files)
        
        total_files = len(files)
        train_count = int(total_files * train_ratio)
        val_count = int(total_files * val_ratio)
        
        train_files = files[:train_count]
        val_files = files[train_count:train_count + val_count]
        test_files = files[train_count + val_count:]
        
        # Create directories
        for subset in ["train", "val", "test"]:
            os.makedirs(os.path.join(SPLIT_DIR, subset, cls), exist_ok=True)
            
        # Copy files
        for f in train_files:
            shutil.copy(os.path.join(cls_src, f), os.path.join(SPLIT_DIR, "train", cls, f))
        for f in val_files:
            shutil.copy(os.path.join(cls_src, f), os.path.join(SPLIT_DIR, "val", cls, f))
        for f in test_files:
            shutil.copy(os.path.join(cls_src, f), os.path.join(SPLIT_DIR, "test", cls, f))
            
        print(f"Class '{cls}': {total_files} total -> {len(train_files)} train, {len(val_files)} val, {len(test_files)} test")


def build_model(num_classes):
    """
    Builds the classification model using MobileNet transfer learning.
    Integrates image preprocessing directly into the model graph for easier deployment.
    """
    print("\n--- Building MobileNet Model ---")
    
    # Input Layer
    inputs = layers.Input(shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3), name="input_image")
    
    # Preprocessing: MobileNet expects input normalized between [-1, 1]
    # Scaling formula: (pixel_value / 127.5) - 1.0
    x = layers.Rescaling(scale=1.0 / 127.5, offset=-1.0, name="normalization")(inputs)
    
    # MobileNet Base Model (weights pre-trained on ImageNet)
    base_model = tf.keras.applications.MobileNet(
        input_shape=(IMAGE_SIZE[0], IMAGE_SIZE[1], 3),
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False  # Freeze base layers
    
    # Connect base model
    x = base_model(x, training=False)
    
    # Classification Head
    x = layers.GlobalAveragePooling2D(name="global_pooling")(x)
    x = layers.Dense(128, activation="relu", name="dense_features")(x)
    x = layers.Dropout(0.3, name="dropout")(x)
    outputs = layers.Dense(num_classes, activation="softmax", name="predictions")(x)
    
    model = models.Model(inputs, outputs, name="Crop_Disease_Classifier")
    
    model.compile(
        optimizer="adam",
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )
    
    model.summary()
    return model


def plot_metrics(history):
    """Generates training accuracy and loss curves."""
    acc = history.history["accuracy"]
    val_acc = history.history["val_accuracy"]
    loss = history.history["loss"]
    val_loss = history.history["val_loss"]
    
    epochs_range = range(len(acc))
    
    plt.figure(figsize=(12, 5))
    
    # Plot Accuracy
    plt.subplot(1, 2, 1)
    plt.plot(epochs_range, acc, label="Training Accuracy", color="#1f77b4", linewidth=2)
    plt.plot(epochs_range, val_acc, label="Validation Accuracy", color="#ff7f0e", linewidth=2)
    plt.title("Training & Validation Accuracy", fontsize=12, fontweight="bold")
    plt.xlabel("Epochs")
    plt.ylabel("Accuracy")
    plt.legend(loc="lower right")
    plt.grid(True, linestyle="--", alpha=0.5)
    
    # Plot Loss
    plt.subplot(1, 2, 2)
    plt.plot(epochs_range, loss, label="Training Loss", color="#1f77b4", linewidth=2)
    plt.plot(epochs_range, val_loss, label="Validation Loss", color="#ff7f0e", linewidth=2)
    plt.title("Training & Validation Loss", fontsize=12, fontweight="bold")
    plt.xlabel("Epochs")
    plt.ylabel("Loss")
    plt.legend(loc="upper right")
    plt.grid(True, linestyle="--", alpha=0.5)
    
    plot_path = os.path.join(PLOTS_DIR, "training_metrics.png")
    plt.savefig(plot_path, dpi=300, bbox_inches="tight")
    plt.close()
    print(f"Training plots saved to: {plot_path}")


def evaluate_model(model, test_ds, class_names):
    """
    Evaluates the model on test dataset and generates:
    1. Classification Report (Precision, Recall, F1-Score)
    2. Confusion Matrix Plot
    """
    print("\n--- Evaluating Model on Test Set ---")
    
    # Get ground truth labels
    y_true = np.concatenate([y for _, y in test_ds], axis=0)
    y_true_indices = np.argmax(y_true, axis=1)
    
    # Get model predictions
    y_pred = model.predict(test_ds)
    y_pred_indices = np.argmax(y_pred, axis=1)
    
    # Classification Report
    report = classification_report(y_true_indices, y_pred_indices, target_names=class_names)
    print("\nClassification Report:")
    print(report)
    
    report_path = os.path.join(PLOTS_DIR, "classification_report.txt")
    with open(report_path, "w") as f:
        f.write(report)
    print(f"Report text saved to: {report_path}")
    
    # Confusion Matrix
    cm = confusion_matrix(y_true_indices, y_pred_indices)
    
    # Plotting Confusion Matrix
    plt.figure(figsize=(8, 6))
    plt.imshow(cm, interpolation="nearest", cmap=plt.cm.Greens)
    plt.title("Confusion Matrix", fontsize=14, fontweight="bold")
    plt.colorbar()
    tick_marks = np.arange(len(class_names))
    plt.xticks(tick_marks, class_names, rotation=45, ha="right")
    plt.yticks(tick_marks, class_names)
    
    # Print values in matrix boxes
    thresh = cm.max() / 2.0
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            plt.text(j, i, format(cm[i, j], "d"),
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")
            
    plt.tight_layout()
    plt.ylabel("True label")
    plt.xlabel("Predicted label")
    
    cm_path = os.path.join(PLOTS_DIR, "confusion_matrix.png")
    plt.savefig(cm_path, dpi=300, bbox_inches="tight")
    plt.close()
    print(f"Confusion matrix plot saved to: {cm_path}")


def main():
    ensure_directories()
    
    # 1. Fallback to mock dataset if needed
    generate_mock_dataset()
    
    # 2. Split dataset
    split_dataset()
    
    train_dir = os.path.join(SPLIT_DIR, "train")
    val_dir = os.path.join(SPLIT_DIR, "val")
    test_dir = os.path.join(SPLIT_DIR, "test")
    
    # 3. Load datasets using Keras image_dataset_from_directory
    print("\n--- Loading Datasets into memory ---")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        train_dir,
        label_mode="categorical",
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=True
    )
    
    val_ds = tf.keras.utils.image_dataset_from_directory(
        val_dir,
        label_mode="categorical",
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=False
    )
    
    test_ds = tf.keras.utils.image_dataset_from_directory(
        test_dir,
        label_mode="categorical",
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=False  # Crucial for matching ground truth with predictions
    )
    
    class_names = train_ds.class_names
    print(f"Model classes to train on: {class_names}")
    
    # Save class names for prediction script and API usage
    class_names_path = os.path.join(MODELS_DIR, "class_names.json")
    with open(class_names_path, "w") as f:
        json.dump(class_names, f, indent=4)
    print(f"Saved class names config mapping to: {class_names_path}")
    
    # 4. Optimization for performance: Prefetch and Cache
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
    test_ds = test_ds.prefetch(buffer_size=AUTOTUNE)
    
    # 5. Build Model
    model = build_model(num_classes=len(class_names))
    
    # 6. Callbacks: EarlyStopping to prevent overfitting and ModelCheckpoint
    checkpoint_path = os.path.join(MODELS_DIR, "crop_disease_model.h5")
    
    callbacks_list = [
        callbacks.EarlyStopping(
            monitor="val_loss",
            patience=3,
            restore_best_weights=True,
            verbose=1
        ),
        callbacks.ModelCheckpoint(
            filepath=checkpoint_path,
            monitor="val_loss",
            save_best_only=True,
            verbose=1
        )
    ]
    
    # 7. Training the model
    print("\n--- Starting Model Training ---")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=callbacks_list
    )
    
    # 8. Plot results
    plot_metrics(history)
    
    # 9. Evaluate model performance
    evaluate_model(model, test_ds, class_names)
    
    print("\n--- Training Pipeline Completed! ---")
    print(f"Model is saved and ready for deployment at: {checkpoint_path}")

if __name__ == "__main__":
    main()
