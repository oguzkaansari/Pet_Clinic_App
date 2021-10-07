function getAllGroups() {

    $.ajax({
        url: '/specifications/group/all',
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
getAllGroups();

$('#group_add_form').submit( ( event ) => {
    event.preventDefault();

    const name = $("#g_name").val();
    const detail = $("#g_detail").val();

    const obj = {
        name: name,
        detail: detail
    }
    console.log(obj);
    $.ajax({
        url: '/specifications/group/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== "0" ) {
                console.log(data);
                getAllGroups();
            }else {
                alert("Ýþlem sýrasýnda hata oluþtu!");
            }
        },
        error: function (err) {
            console.log(err)
            alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
        }
    })
})

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.name+`</td>
            <td>`+itm.count+`</td>
            <td>`+itm.detail+`</td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getGroupDetail(`+itm.customers+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="deleteGroup(`+itm.id+`)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
              </div>
            </td>
          </tr>`;
    }
    $('#tBodyGroups').html(html);
}

function getGroupDetail(customers) {
    console.log(customers);
    let html = ``;
    if(customers === undefined || customers.length === 0){
        html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Detay"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3 redDiv">
                            Bu gruba kayitli bir musteri bulunamadi.
                        </div>
                    </div>`;

    }else {
        html += `<div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">
                        <span class="fas fa-users"></span>
                            ` +"Detay"+ `
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mt-2">
                        <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                          <thead>
                          <tr>
                            <th>Adý Soyadý</th>
                            <th>Telefon</th>
                            <th>Telefon 2</th>
                            <th>Telefon 2</th>
                            <th>E-Posta</th>
                            <th>Vergi Dairesi</th>
                            <th>T.C. / Vergi No.</th>
                            <th>Þehir</th>
                            <th>Ýlçe</th>
                            <th>Adres</th>
                            <th>Not</th>
                            <th>Grup</th>
                            <th>Ýndirim</th>
                          </tr>
                          </thead>
                          <tbody>`;

        for (let i = 0; i < customers.length; i++) {

            const customer = customers[i];
            html += ` <tr role="row" class="odd">
                        <td>` + customer.name + "" + customer.surname + `</td>
                        <td>` + customer.phone1 + `</td>
                        <td>` + customer.phone2 + `</td>
                        <td>` + customer.email + `</td>
                        <td>` + customer.taxname + `</td>
                        <td>` + customer.taxno + `</td>
                        <td>` + customer.city + `</td>
                        <td>` + customer.district + `</td>
                        <td>` + customer.address + `</td>
                        <td>` + customer.note + `</td>
                        <td>` + customer.group + `</td>
                        <td>` + customer.discount + `</td>
                    </tr>`;
        }
        html += `</tbody></table></div></div></div>`;
    }
    $('#groupDetailModalContent').html(html);
    $('#groupDetailModal').modal('toggle');

}

function deleteGroup(id) {
    let answer = confirm("Silmek istediðinizden emin misniz?");

    if(answer){
        $.ajax({
            url: '/specifications/group/delete/' + id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType : 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data)
                if ( data === 1 ) {
                    console.log(data);
                    getAllGroups();
                }else {
                    alert("Ýþlem sýrasýnda hata oluþtu!");
                }
            },
            error: function (err) {
                console.log(err)
                alert("Ýþlem iþlemi sýrýsýnda bir hata oluþtu!");
            }
        })
    }
}
