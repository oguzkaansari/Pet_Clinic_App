let productList = [];
function getAllSuppliers() {

    $.ajax({
        url: '/supplier/all',
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

function getProducts(id) {

    $.ajax({
        url: '/supplier/products/' + id,
        type: 'GET',
        dataType: 'Json',
        success: function (data) {
            console.log(data);
            showSupplierProducts(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.name+`</td>
            <td>`+itm.mail+`</td>
            <td>`+itm.phone+`</td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="getProducts(`+itm.id+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>            
          </tr>`;
    }
    $('#tBodySuppliers').html(html);
}

function showSupplierProducts(products) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-truck"></span>
                            `+"Satýn Alma Geçmiþi"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>`;

    if(products === undefined || products.length === 0){
        html += `<div class="modal-body">
                        <div class="row mt-3 redDiv">
                            Bu tedarikciye ait bir satin alma gecmisi bulunamadi.
                        </div>
                 </div>`;
    }else{
        html += `<div class="modal-body">
                         <div class="row">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Ürün Adý</th>
                                    <th scope="col">Birim</th>
                                    <th scope="col">Tip</th>
                                    <th scope="col">Barkod</th>
                                    <th scope="col">Kod</th>
                                    <th scope="col">KDV</th>
                                    <th scope="col">Alýþ Fiyatý</th>
                                    <th scope="col">Satýþ Fiyatý</th>
                                    <th scope="col">Kategori</th>
                                </tr>
                                </thead>
                                <tbody>`;

        for (let i = 0; i < products.length; i++) {

            const product = products[i];
            html += `<tr role="row" class="odd">
                        <td>`+product.name+`</td>
                        <td>`+product.unit.name+`</td>
                        <td>`+product.type.name+`</td>
                        <td>`+product.barcode+`</td>
                        <td>`+product.code+`</td>
                        <td>`+product.tax.amount+`</td>
                        <td>`+product.buy_price+`</td>
                        <td>`+product.sell_price+`</td>
                        <td>`+product.category.name+`</td>
                    </tr>`;
        }
    }
    html += `</tbody></table></div></div>`;

    $('#supplierDetailModalContent').html(html);
    $('#supplierDetailModal').modal('toggle');
}

function showSupplierTicket(ticket) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-truck"></span>
                            `+"Aktif Fatura"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>`;

    if(ticket === undefined || ticket === null){
        html += `<div class="modal-body">
                        <div class="row mt-3 redDiv">
                            Bu tedarikçiye ait aktif bir fatura bulunamadý.
                        </div>
                 </div>`;
    }else{
        html += `<div class="modal-body">
                         <div class="row">
                            <div class="col-md-6">
                                <div class="row mt-1">
                                    <span>`+ticket.no+`</span>
                                </div>
                                <div class="row mt-1">
                                    <span>`+ticket.title+`</span>
                                </div>
                                <div class="row mt-1">
                                    <span>`+ticket.note+`</span>
                                </div>
                        </div>
                            <div class="col-md-6">
                                <div class="card" id="supplierModelCard" style="width: 18rem;">
                                        <div class="card-body" id="supplierModelCardBody">
                                            <h5 class="card-title">Toplam Ücret</h5>
                                            <h5>`+ticket.price+`</h5>
                                        </div>
                                </div>
                            </div>`;

    }
    $('#supplierDetailModalContent').html(html);
    $('#supplierDetailModal').modal('toggle');
}

$('#supplier_add_form').submit( ( event ) => {
    event.preventDefault();

    const s_name = $("#sup_name").val();
    const s_mail = $("#sup_mail").val();
    const s_phone = $("#sup_phone").val();
    const obj = {
        name: s_name,
        mail: s_mail,
        phone: s_phone
    }
    console.log(obj);

    $.ajax({
        url: '/supplier/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {

            if ( data === 1 ) {
                alert("Ýþlem Baþarýlý")
                $('#supplier_add_form').trigger("reset");
                getAllSuppliers();
            }else{
                alert("Validation hatasý!")
                console.log(data);
            }
        },
        error: function (err) {
            console.log(err);
            alert("Ýþlem sýrýsýnda bir hata oluþtu!");
        }
    })
})

getAllSuppliers();
getProducts();