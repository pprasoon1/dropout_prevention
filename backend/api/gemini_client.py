import google.generativeai as genai
import json
import re

# Configure the Gemini API client
genai.configure(api_key='AIzaSyDZETWTeBf46Yb9s3H5Vb6Xii0F1D26YiE')

def analyze_student_data(student_data):
    # Prepare the prompt for Gemini
    prompt = f"""
    Analyze the following student data and predict the likelihood of dropout in JSON format:
    Attendance: {student_data['attendance']}%
    Grades: {student_data['grades']}
    Behavior Score: {student_data.get('behavior_score', 'N/A')}
    Extracurricular Activities: {student_data.get('extracurricular_activities', 'N/A')}
    Parent Involvement: {student_data.get('parent_involvement', 'N/A')}
    Socioeconomic Status: {student_data.get('socioeconomic_status', 'N/A')}

    Provide the result in the following JSON format:
    {{
        "dropout_risk": "low/medium/high",
        "dropout_probability": float (0-1),
        "risk_factors": array of strings,
        "recommendations": array of strings
    }}
    """

    # Generate a response using Gemini
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)

    # Attempt to parse the response as JSON
    return parse_gemini_response(response.text)

def parse_gemini_response(response_text):
    # Extract JSON-like text from response
    json_text_match = re.search(r'\{.*?\}', response_text, re.DOTALL)
    if json_text_match:
        json_text = json_text_match.group(0)
        try:
            response_data = json.loads(json_text)

            # Extract fields if available, or provide default values
            dropout_risk = response_data.get('dropout_risk', 'N/A')
            dropout_probability = response_data.get('dropout_probability', 0.0)
            risk_factors = response_data.get('risk_factors', [])
            recommendations = response_data.get('recommendations', [])

            # Return the structured response
            return {
                'dropout_risk': dropout_risk,
                'dropout_probability': dropout_probability,
                'risk_factors': risk_factors,
                'recommendations': recommendations
            }
        except json.JSONDecodeError:
            # Return an error if the response is not in the expected format
            return {
                'error': 'Unable to parse JSON from the response',
                'raw_response': response_text
            }
    else:
        # Return an error if no JSON is found in the response
        return {
            'error': 'No JSON found in the response',
            'raw_response': response_text
        }
