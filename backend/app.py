from flask import Flask, request, jsonify, send_file
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_parquet("Your Pathway to csv/paraquet")

# Full dataset API with search, filter, and sorting
@app.route("/api/data", methods=["GET"])
def get_data():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 50))
    search_query = request.args.get("search", "").lower()
    sort_by = request.args.get("sort_by", "")
    sort_order = request.args.get("sort_order", "asc")

    # Apply search filter if query exists
    filtered_df = df
    if search_query:
        filtered_df = df[df.apply(lambda row: search_query in str(row.values).lower(), axis=1)]
    
    # Apply sorting
    if sort_by and sort_by in df.columns:
        ascending = sort_order == "asc"
        filtered_df = filtered_df.sort_values(by=sort_by, ascending=ascending)

    # Pagination
    total_entries = len(filtered_df)
    total_pages = (total_entries + limit - 1) // limit
    start = (page - 1) * limit
    end = start + limit
    paginated_data = filtered_df.iloc[start:end].to_dict(orient="records")

    return jsonify({
        "data": paginated_data,
        "total_entries": total_entries,
        "total_pages": total_pages
    })


# Export data to CSV
@app.route("/api/export", methods=["GET"])
def export_data():
    search_query = request.args.get("search", "").lower()

    # Apply search filter
    export_df = df
    if search_query:
        export_df = df[df.apply(lambda row: search_query in str(row.values).lower(), axis=1)]
    
    # Save to CSV
    csv_path = "exported_data.csv"
    export_df.to_csv(csv_path, index=False)
    
    return send_file(csv_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
