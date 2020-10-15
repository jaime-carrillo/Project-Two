// var option = "/api/v1.0/ed";

// Assemble API query URL

// d3.json(option).then(function(data) {
//     console.log(data)
// })

d3.csv("../LA_ed_data.csv").then(function(data){
    console.log(data)

all_hospitals = []

for id, name, address, city, zip, bed, type, visits, medical, medicare, other, self, dx, his, non in results:
    hospital_dict = {}
    hospital_dict["oshpd_id"] = id
    hospital_dict["facility_name"] = name
    hospital_dict["DBA_ADDRESS1"] = address
    hospital_dict["DBA_CITY"] = city
    hospital_dict["DBA_ZIP_CODE"] = zip
    hospital_dict["licensed_bed_size"] = bed
    hospital_dict["control_type_desc"] = type
    hospital_dict["ED_Visit"] = visits
    hospital_dict["Medi_Cal"] = medical
    hospital_dict["Medicare"] = medicare
    hospital_dict["Other_Payer"] = other
    hospital_dict["SelfPay"] = self
    hospital_dict["DX_Symptoms"] = dx
    hospital_dict["HispanicorLatino"] = his
    hospital_dict["Non-HispanicorNon-Latino"] = non

        all_hospitals.append(hospital_dict)

    return jsonify(all_hospitals)

    var trace1 = {
        x: data.map(row => row.id),
        y: data.map(row => row.visits),
        text: data.map(row => row.name),
        type: "bar"
    };

    var data = [trace1];

    var layout = {
        title: "Emergency Room Visits in Los Angeles County"
    };

    Plotly.newPlot("plot", data, layout);



})


