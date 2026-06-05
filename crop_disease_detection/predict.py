# crop_disease_detection/predict.py

import os
import sys
import json
import argparse
import numpy as np
from PIL import Image

import tensorflow as tf

# Import recommendations mapping helper
from recommendations import get_recommendation

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_disease_model.h5")
CLASSES_PATH = os.path.join(BASE_DIR, "models", "class_names.json")

def load_inference_resources():
    """Loads the compiled H5 model and index-to-class configuration."""
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model not found at '{MODEL_PATH}'.")
        print("Please train the model first by running: python train_model.py")
        sys.exit(1)
        
    if not os.path.exists(CLASSES_PATH):
        print(f"Error: Class configuration not found at '{CLASSES_PATH}'.")
        print("Please train the model first by running: python train_model.py")
        sys.exit(1)
        
    # Load model
    print("Loading TensorFlow Keras model... (this may take a few seconds)")
    model = tf.keras.models.load_model(MODEL_PATH)
    
    # Load class names
    with open(CLASSES_PATH, "r") as f:
        class_names = json.load(f)
        
    return model, class_names

def predict_image(image_path, model, class_names):
    """
    Runs model inference on a single image.
    Performs verification and pre-processing.
    """
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at '{image_path}'")
        sys.exit(1)
        
    try:
        # Load and resize image to 224x224 (matching MobileNet architecture input)
        img = Image.open(image_path).convert("RGB")
        img_resized = img.resize((224, 224))
        
        # Convert image to numpy array
        img_array = np.array(img_resized, dtype=np.float32)
        
        # Add batch dimension: shape becomes (1, 224, 224, 3)
        img_batch = np.expand_dims(img_array, axis=0)
        
        # Run prediction
        # Note: Preprocessing (rescaling to [-1, 1]) is embedded inside the model layers
        predictions = model.predict(img_batch, verbose=0)
        
        # Extract highest probability index
        predicted_idx = np.argmax(predictions[0])
        confidence = predictions[0][predicted_idx]
        predicted_class = class_names[predicted_idx]
        
        # Get recommendations
        rec_info = get_recommendation(predicted_class)
        
        return {
            "disease_class_raw": predicted_class,
            "disease": rec_info["disease"],
            "confidence": f"{confidence * 100:.2f}%",
            "recommendation": rec_info["recommendation"]
        }
        
    except Exception as e:
        print(f"Error executing prediction pipeline: {str(e)}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Predict crop disease from leaf image.")
    parser.add_argument("--image", type=str, required=True, help="Absolute or relative path to the crop leaf image.")
    args = parser.parse_args()
    
    model, class_names = load_inference_resources()
    result = predict_image(args.image, model, class_names)
    
    print("\n" + "="*50)
    print(" CROP DISEASE DETECTION CLI RESULT")
    print("="*50)
    print(f"Detected Class: {result['disease']}")
    print(f"Confidence:     {result['confidence']}")
    print(f"Recommendation: {result['recommendation']}")
    print("="*50)

if __name__ == "__main__":
    main()
