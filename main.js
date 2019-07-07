// The minimum prediction confidence.
const threshold = 0.6;

display_results = (new_order) => {
    var perrow = 3,
        html = "<tr>"

    for (var i = 0; i < new_order.length; i++) {
        //label
        html += "<td>" + new_order[i].label + "</td>"
            //confidence
        html += "<td>" + (new_order[i].preds * 100).toFixed(2) + "%</td>"
            //matched
        if (new_order[i].class == true) {
            html += "<td><font color='red'><b>" + new_order[i].class + "</b></font></td>"
        } else {
            html += "<td>" + new_order[i].class + "</td>"
        }
        var next = i + 1;
        if (next != new_order.length) {
            html += "</tr><tr>";
        }
    }
    html += "</tr>"
    $("#prediction_results").html(html);
}

const classify = async(inputs) => {
    const results = await model.classify(inputs);
    return results.map((obj) => {
        return { label: obj.label, preds: obj.results[0].probabilities[1], class: obj.results[0].match }
    })
};


const predict = async() => {
    model = await toxicity.load(threshold);
    $("#ready-trigger").text("Model is ready")
    $("#predict-text").click(function() {
        const text = $("#commentField").val();
        const predictions = classify([text]).then(d => {
            display_results(d);
            $("#classified-text").text(text);
        })
    })
};

predict()