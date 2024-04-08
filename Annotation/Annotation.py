import cv2

def annotate_image(image_path):
    try:
        # Read the image
        image = cv2.imread(image_path)
        
        # Check if the image was successfully read
        if image is None:
            return "Error: Failed to read the image file"
        
        # Perform annotation (example: extract color information)
        color_annotation = extract_color_annotation(image)
        
        # Return the annotation
        print(color_annotation)
    except Exception as e:
        return f"Error: An error occurred during image annotation - {str(e)}"

def extract_color_annotation(image):
    # Example: Extract color information (average color)
    avg_color = image.mean(axis=0).mean(axis=0)
    return avg_color

annotate_image('/Users/nishantmalik/VisionMark-AI-Assisted-Annotation-Suite/uploads/cat.jpeg')