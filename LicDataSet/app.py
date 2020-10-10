import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt
from datetime import date, timedelta

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################

# Connect to file
engine = create_engine("sqlite:///Facilities.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Hospitals = Base.classes.hospitals
Licensed  = Base.classes.LosAnglesCountyLicData

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
# / Home page.
# List all routes that are available.

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/hospitals<br/>"
        f"/api/v1.0/facilities<br/>"
    )


#################################################
# /api/v1.0/precipitation
# Convert the query results to a dictionary using date as the key and prcp as the value.
# Return the JSON representation of your dictionary.
#################################################


@app.route("/api/v1.0/hospitals")
def hospitals():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Hospitals.OSHPD_ID, Hospitals.LATITUDE, Hospitals.LONGITUDE).\
        order_by(Hospitals.OSHPD_ID).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_hospitals
    all_hospitals = []
    for id, lat, lon in results:
        hoptial_dict = {}
        hoptial_dict["ID"] = id
        hoptial_dict["LATITUDE"] = lat
        hoptial_dict["LONGITUDE"] = lon
        all_hospitals.append(hoptial_dict)

    return jsonify(all_hospitals)



@app.route("/api/v1.0/facilities")
def facilities():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Licensed.OSHPD_ID, Licensed.FACILITY_NAME, Licensed.LATITUDE, Licensed.LONGITUDE, Licensed.LICENSE_CATEGORY_DESC ).\
        filter(Licensed.LICENSE_CATEGORY_DESC == "Community Clinic").\
        order_by(Licensed.OSHPD_ID).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_facilities = []
    for id, name, lat, lon, type in results:
        facilities_dict = {}
        facilities_dict["Id"] = id
        facilities_dict["Name"] = name
        facilities_dict["LATITUDE"] = lat
        facilities_dict["LONGITUDE"] = lon
        facilities_dict["Type"] = type
        all_facilities.append(facilities_dict)

    return jsonify(all_facilities)


#################################################
# /api/v1.0/stations
# Return a JSON list of stations from the dataset.
#################################################

# @app.route("/api/v1.0/stations")
# def stations():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all stations
#     results = session.query(Station.station).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_stations = list(np.ravel(results))

#     return jsonify(all_stations)


#################################################
# /api/v1.0/tobs
# Query the dates and temperature observations of the most active station for the last year of data.
# Return a JSON list of temperature observations (TOBS) for the previous year.
#################################################

# @app.route("/api/v1.0/tobs")
# def tobs():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query most active station
#     active_station = session.query(Measurement.station, func.round(func.count(Measurement.tobs))).\
#     group_by(Measurement.station).order_by(func.round(func.count(Measurement.tobs)).desc()).all()
    
#     active_station_name = active_station[0][0]
    
#     # Query all dates in the last year for most active station
#     results = session.query(Measurement.station, Measurement.date, Measurement.tobs).\
#             filter(active_station_name == Measurement.station).\
#             filter(Measurement.date >= '2016-08-23').\
#             order_by(Measurement.date).all()

#     session.close()

#     return jsonify(results)   


#################################################
# /api/v1.0/<start> and /api/v1.0/<start>/<end>
# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
#################################################

#################################################
# When given the start only, calculate TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.
#################################################

# @app.route("/api/v1.0/<start>/<end>")
# def Stats_start_end(start, end):
#     """Fetch the stats for that match the start and end dates for
#        the path variable supplied by the user, or a 404 if not."""

#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # canonicalized = real_name.replace(" ", "").lower()
#     # for character in justice_league_members:
#     #     search_term = character["real_name"].replace(" ", "").lower()

#     try:

#         sel = [Station.id,
#             Station.station, 
#             func.round(func.min(Measurement.tobs)), 
#             func.round(func.max(Measurement.tobs)), 
#             func.round(func.avg(Measurement.tobs)), 
#             func.round(func.count(Measurement.tobs))]

#         start_date = dt.datetime.strptime(start, '%Y-%m-%d')
#         end_date = dt.datetime.strptime(end, '%Y-%m-%d')
#         max_date = session.query(func.max(Measurement.date)).scalar()
#         check_date = dt.datetime.strptime(max_date, '%Y-%m-%d')

#         if start_date <= check_date and end_date > start_date:
#             station_stats_query =  session.query(*sel).group_by(Station.station).filter(Station.station == Measurement.station).filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()
            
#         # Create a dictionary from the row data and append to a list of station_stats
#             station_stats = []
#             for id, station, min, max, avg, count in station_stats_query:
#                 station_stats_dict = {}
#                 station_stats_dict["ID"] = id
#                 station_stats_dict["Station"] = station
#                 station_stats_dict["Max"] = max
#                 station_stats_dict["Min"] = min
#                 station_stats_dict["Avg"] = avg
#                 station_stats_dict["Count"] = count
#                 station_stats.append(station_stats_dict)
#             return jsonify(station_stats)


#         else:
#             return jsonify({"error": f"statistics with a start date of {start} or {end} is not found."}), 404
    
#     except:
#         jsonify(f"Date format {start} or {end} not vaild . Please use YYYY-MM-DD")


#################################################
# When given the start and the end date, calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive.
#################################################

# @app.route("/api/v1.0/<start>")
# def Stats_start_only(start):
#     """Fetch the stats for that match the start and end dates for
#        the path variable supplied by the user, or a 404 if not."""

#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # canonicalized = real_name.replace(" ", "").lower()
#     # for character in justice_league_members:
#     #     search_term = character["real_name"].replace(" ", "").lower()

#     try:

#         sel = [Station.id,
#             Station.station, 
#             func.round(func.min(Measurement.tobs)), 
#             func.round(func.max(Measurement.tobs)), 
#             func.round(func.avg(Measurement.tobs)), 
#             func.round(func.count(Measurement.tobs))]

#         start_date = dt.datetime.strptime(start, '%Y-%m-%d')
#         max_date = session.query(func.max(Measurement.date)).scalar()
#         check_date = dt.datetime.strptime(max_date, '%Y-%m-%d')

#         if start_date <= check_date:
#             station_stats_query =  session.query(*sel).group_by(Station.station).filter(Station.station == Measurement.station).filter(Measurement.date >= start_date).all()
            
#         # Create a dictionary from the row data and append to a list of station_stats
#             station_stats = []
#             for id, station, min, max, avg, count in station_stats_query:
#                 station_stats_dict = {}
#                 station_stats_dict["ID"] = id
#                 station_stats_dict["Station"] = station
#                 station_stats_dict["Max"] = max
#                 station_stats_dict["Min"] = min
#                 station_stats_dict["Avg"] = avg
#                 station_stats_dict["Count"] = count
#                 station_stats.append(station_stats_dict)
#             return jsonify(station_stats)


#         else:
#             return jsonify({"error": f"statistics with a start date of {start} is not found."}), 404
    
#     except:
#         jsonify(f"Date format {start} not vaild . Please use YYYY-MM-DD")

#################################################
# Code to run app
#################################################
if __name__ == '__main__':
    app.run(debug=True)





