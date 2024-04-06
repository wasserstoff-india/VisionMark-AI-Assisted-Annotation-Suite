## Project Guide:

## 1. Introduction

### Project Overview
VisionMark is designed to facilitate the creation and refinement of datasets for YOLO image recognition models. By enabling users to capture and annotate images through a mobile interface, and allowing for the review and exportation of this data, VisionMark aims to significantly streamline the preparation of high-quality datasets for AI applications.

## 2. User Stories

### End-User Flow

**Image Capture:**
- The mobile app utilizes the camera API to guide users in capturing images. Features like grid overlays and optimal lighting indicators ensure images are of high quality for annotation.

**Automatic Annotation:**
- Once an image is captured, it's sent to the backend, where pre-trained machine learning models identify objects. These models, accessible via a RESTful API, return coordinates and labels for detected objects.

**Manual Annotation:**
- Users interact with a canvas overlay on the image to adjust bounding boxes and labels. This UI component is built using reactive front-end frameworks to ensure responsiveness and ease of use.

**Submission:**
- Annotated images are submitted back to the server, including any user modifications. The submission endpoint validates the data before updating the database.

### Admin User Flow

**Review Queue:**
- The admin dashboard fetches a list of pending reviews from the backend, displaying them with options for approval or rejection.

**Annotation Review:**
- Admins can click on an image to view its annotations in detail. Each annotation is presented alongside the image, with tools available for direct modification or commenting.

**Approval/Rejection:**
- Decisions are made on a per-image basis, with the backend processing these updates and optionally triggering notifications to the user.

**Data Export:**
- A backend service compiles approved images and annotations into the requested format, which admins can then download directly from the dashboard.

## 3. System Architecture

**Mobile App:**
- **React Native** is recommended for its cross-platform capabilities. The app integrates directly with the device's camera using libraries like `react-native-camera`.

**Backend Server:**
- A **Node.js** server with **Express.js** facilitates RESTful API services. This includes endpoints for image upload, annotation retrieval, and submission processing.
- For automatic annotations, Python microservices utilizing frameworks like **Flask** can host machine learning models, with communication between Node.js and Python services over HTTP or message brokers like RabbitMQ.

**Database:**
- **MongoDB** offers flexibility in storing structured data (user accounts, image metadata) alongside unstructured data (annotations). The use of schemas with Mongoose can aid in data validation and integrity.

**Admin Dashboard:**
- The dashboard, built with **React**, communicates with the backend via API calls. It employs libraries like `axios` for HTTP requests and `react-router` for navigation.

## 4. Key Features

### Automatic Annotations

- The backend endpoint `/api/annotate` receives image data, processes it through ML models, and returns annotations.
- **Flask** application structure for ML service:

    ```python
    from flask import Flask, request, jsonify
    from annotate_image import annotate

    app = Flask(__name__)

    @app.route('/api/annotate', methods=['POST'])
    def process_image():
        image = request.files['image']
        annotations = annotate(image)
        return jsonify(annotations)

    if __name__ == '__main__':
        app.run(debug=True, port=5000)
    ```

### Manual Annotation Interface

- Front-end implementation involves a dynamic canvas where users can draw and modify bounding boxes. Libraries like `fabric.js` (for web) can simplify canvas manipulation.
- Example component structure for a bounding box editor:

    ```jsx
    import React, { useState, useEffect } from 'react';
    import { fabric } from 'fabric';

    const BoundingBoxEditor = ({ imageUrl }) => {
        useEffect(() => {
            const canvas = new fabric.Canvas('annotation-canvas');
            // Load the image and annotations
        }, [imageUrl]);

        return <canvas id="annotation-canvas" />;
    };
    ```

### Data Export

- Backend logic for exporting annotations, supporting multiple formats. Utilizing **Pandas** in Python for data manipulation and export:

    ```python
    import pandas as pd

    def export_annotations(annotations, format='csv'):
        df = pd.DataFrame(annotations)
        if format == 'csv':
            return df.to_csv(index=False)
        # Additional format support
    ```

### Security and Scalability

- Implement JWT for secure API access, utilizing libraries such as `jsonwebtoken` in Node.js.
- Example of securing an endpoint:

    ```javascript
    const jwt = require('jsonwebtoken');

    function authenticateToken(req, res, next) {
        const token = req.headers['authorization'].split(' ')[1];
        if (token

 == null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    ```

## 5. Technical Challenges

### Integrating AI Models
- Challenges include latency and computational load. Solutions involve asynchronous processing and leveraging cloud-based GPU resources for model inference.

### Ensuring Data Accuracy
- Implement comprehensive validation both at the UI level and the backend, alongside clear annotation guidelines within the app.

### Handling Large Datasets
- Techniques like database sharding and leveraging cloud storage solutions (e.g., AWS S3) for images can mitigate issues related to scalability.

## 6. Evaluation Criteria

**Code Quality:**
- Submissions should follow clean code principles, be well-documented, and include meaningful unit tests.

**System Design Understanding:**
- Demonstrated through a coherent implementation that aligns with the proposed architecture and efficiently integrates the various components.

**Problem-solving Skills:**
- Creative and practical solutions to technical challenges, particularly those involving AI integration and user interface design.

**Feature Completeness:**
- Fulfillment of all key features as described, with a functioning prototype that showcases the capabilities of VisionMark.

---

This guide aims to arm developers with the knowledge and direction needed to tackle the VisionMark project, emphasizing technical specifications, code examples, and addressing potential challenges.
