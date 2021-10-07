function getAllCustomers() {

    $.ajax({
        url: '/customer/all',
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
getAllCustomers();

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.no+`</td>
            <td>`+itm.name+" "+itm.surname+`</td>
            <td>`+itm.phone1+`</td>
            <td>`+itm.phone2+`</td>
            <td>`+itm.mail+`</td>
            <td>`+itm.taxno+`</td>
            <td>`+itm.taxname+`</td>
            <td>`+itm.note+`</td>
            <td>`+itm.status.name+`</td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getAddressDetail(`+itm.address+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getGroupsDetail(`+itm.groups+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getActiveReceiptDetail(`+itm.active_receipt+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getPetsDetail(`+itm.pets+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="window.location.href='/customer/form/`+itm.id+`'" type="button" class="btn default-button"><i class="fas fa-pencil-alt"></i></button>
                <button onclick="customerDelete(`+itm.id+`)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
              </div>
            </td>
          </tr>`;
    }
    $('#tBodyCustomers').html(html);
}

function getAddressDetail(address) {

    let html = ``;
    html += `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Adres Detayý"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mt-3">
                            `+address+`
                        </div>
                    </div>`;

    $('#customerDetailModalContent').html(html);
    $('#customerDetailModal').modal('toggle');
}

function getGroupsDetail(groups) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Detay"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>`;

    if(groups === undefined || groups.length === 0){
        html += `<div class="modal-body">
                        <div class="row mt-3 redDiv">
                            Bu müþterinin ait olduðu herhangi bir grup bulunamadý.
                        </div>
                 </div>`;
    }else{
        html += `<div class="modal-body">
                         <div class="row">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Grup</th>
                                    <th scope="col">Üye Sayýsý</th>
                                </tr>
                                </thead>
                                <tbody>`;

        for (let i = 0; i < groups.length; i++) {

            const group = groups[i];
            html += `<tr role="row" class="odd">
                        <td>`+group.name+`</td>
                        <td>`+group.count+`</td>
                        <td>`+group.detail+`</td>
                    </tr>`;
        }
    }
    html += `</tbody></table></div></div>`;

    $('#customerDetailModalContent').html(html);
    $('#customerDetailModal').modal('toggle');
}

function getActiveReceiptDetail(receipt) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Aktif Reçete"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>`;
    if(receipt === undefined || receipt === null){
        html += `<div class="modal-body">
                     <div class="row mt-3 redDiv">
                            Bu müþteriye ait aktif bir reçete bulunamadý.
                     </div>
                 </div>`;
    }else{
        html += `<div class="modal-body">
                         <div class="row">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Ürün Adý</th>
                                    <th scope="col">Ürün Kodu</th>
                                    <th scope="col">Ürün Barkodu</th>
                                </tr>
                                </thead>
                                <tbody>`;

        for (let i = 0; i < receipt.r_sales.length; i++) {

            const sale = receipt.r_sales[i];
            html += `<tr role="row" class="odd">
                        <td>`+sale.product.name+`</td>
                        <td>`+sale.product.code+`</td>
                        <td>`+sale.product.barcode+`</td>
                    </tr>`;
        }
    }
    html += `</tbody></table></div></div>`;

    $('#customerDetailModalContent').html(html);
    $('#customerDetailModal').modal('toggle');
}

function getPetsDetail(pets) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-users"></span>
                            `+"Hastalar"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>`;
    if(pets === undefined || pets.length === 0){
        html += `<div class="modal-body">
                     <div class="row mt-3 redDiv">
                            Bu müþteriye ait hasta bulunamadý.
                     </div>
                 </div>`;
    }else{
        html += `<div class="modal-body">
                         <div class="row">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Adý</th>
                                    <th scope="col">Çip No.</th>
                                    <th scope="col">Kart No.</th>
                                    <th scope="col">Irký</th>
                                    <th scope="col">Türü</th>
                                    <th scope="col">Cinsiyeti</th>
                                </tr>
                                </thead>
                                <tbody>`;

        for (let i = 0; i < pets.length; i++) {

            const pet = pets[i];
            html += `<tr role="row" class="odd">
                        <td>`+pet.name+`</td>
                        <td>`+pet.chipno+`</td>
                        <td>`+pet.cardno+`</td>
                        <td>`+pet.race.name+`</td>
                        <td>`+pet.spec.name+`</td>
                        <td>`+pet.gender.name+`</td>
                    </tr>`;
        }
    }
    html += `</tbody></table></div></div>`;

    $('#customerDetailModalContent').html(html);
    $('#customerDetailModal').modal('toggle');
}

function customerDelete(id) {
    let answer = confirm("Secilen musteriyi silmek istediginizden emin misniz?" + "\r\n" + "Not : Secilen musteriye ait hastalar da silinecektir!" );

    if(answer){
        $.ajax({
            url: '/customer/delete/' + id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType : 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data)
                if ( data === 1 ) {
                    console.log(data);
                    getAllCustomers();
                }else {
                    alert("Ýþlem sýrasýnda hata oluþtu!");
                }
            },
            error: function (err) {
                console.log(err)
                alert("Silme iþlemi sýrýsýnda bir hata oluþtu!");
            }
        })
    }
}

$('#customer_search_form').submit( ( event ) => {
    event.preventDefault();

    let key = $("#c_key").val();
    const status_id = $("#c_status_search").val();

    if(key === null || key === undefined || key === ""){
        key = "0";
    }

    $.ajax({
        url: '/customer/search/' + status_id + '/' + key,
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
