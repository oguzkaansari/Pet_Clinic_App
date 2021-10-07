function getAllTests() {

    $.ajax({
        url: '/lab/tests',
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            createRow(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const test = data[i];
        const itm = test.pet;
        html += `<tr role="row" class="odd">
                    <td>`+test.no+`</td>
                    <td>`+test.type.name+`</td>
                    <td>`+itm.name+`</td>
                    <td>`+itm.chipno+`</td>
                    <td>`+itm.cardno+`</td>
                    <td>`+itm.race.name+`</td>
                    <td>`+itm.spec.name+`</td>
                    <td>`+itm.color+`</td>
                    <td>`+itm.gender.name+`</td>
                    <td class="text-right">
                        <div class="btn-group" role="group"">
                            <button onclick="showTestResult(`+test.result+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
                        </div>
                    </td>  
                    </tr>`;
    }
    $('#tBodyTests').html(html);
}

function showTestResult(result) {
    console.log(result)
    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-file-alt"></span>
                            `+"Test Sonucu"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            <p>`+result+`</p>
                        </div>
                    </div>`;

    $('#testResultModalContent').html(html);
    $('#testResultModal').modal('toggle');
}

$('#test_search_form').submit( ( event ) => {
    event.preventDefault();

    let key = $("#l_key").val();
    const status_id = $("#l_status_search").val();

    if(key === null || key === undefined || key === ""){
        key = "0";
    }

    $.ajax({
        url: '/lab/search/' + status_id + '/' + key,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            createRow(data);

        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})


getAllTests();