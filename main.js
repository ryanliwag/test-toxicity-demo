// The minimum prediction confidence.
const threshold = 0.6;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.

display_results = (new_order) => {
    var perrow = 3, html = "<tr>"

    for (var i = 0; i < new_order.length; i++){
    
        //label
        html += "<td>" + new_order[i].label + "</td>"
    
        //confidence
        html += "<td>" + (new_order[i].preds *100).toFixed(2) + "%</td>"
    
        //matched
        if (new_order[i].class == true){  
            html += "<td><font color='red'><b>" + new_order[i].class + "</b></font></td>"
        } else {        
            html += "<td>" + new_order[i].class + "</td>"
        }
        
    
        var next = i+1;
        if (next!=new_order.length) {
            html += "</tr><tr>";
          }
    }
    html += "</tr>"
    $("#prediction_results").html(html);
}

toxicity.load(threshold).then(model => {

    $( "#ready-trigger" ).html("Model is ready")



    predict = (text) => {
        model.classify(text).then(predictions => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
            
            var conv_predictions = predictions.map((obj) => {
                return {label:obj.label, preds:obj.results[0].probabilities[1], class:obj.results[0].match}
            })
            display_results(conv_predictions)
            console.log(conv_predictions)
          });
    }
    
    $("#predict-text").click(function(){
        var texts = $("#commentField").val();
        predict(texts);
    })
});


