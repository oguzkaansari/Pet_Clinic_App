function getAllCategories() {

    $.ajax({
        url: '/specifications/category/all',
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
getAllCategories();

function createRow(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        const itm = data[i];
        html += `<tr role="row" class="odd">
            <td>`+itm.name+`</td>
            <td>`+itm.name+`</td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="showCategoryProducts(`+itm.products+`)" type="button" class="btn default-button"><i class="far fa-file-alt"></i></button>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button onclick="deleteCategory(`+itm.id+`)" type="button" class="btn red-button"><i class="far fa-trash-alt"></i></button>
              </div>
            </td>
          </tr>`;
    }
    $('#tBodyCategories').html(html);
}

function showCategoryProducts(products) {

    let html = `<div class="modal-header">
                        <h5 class="modal-title" id="exampleModalToggleLabel">
                            <span class="fas fa-syringe"></span>
                            `+"Ürünler"+`
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>`;

    if(products === undefined || products.length === 0){
        html += `<div class="modal-body">
                        <div class="row mt-3 redDiv">
                            Bu kategoride herhangi bir ürün bulunamadý.
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

    $('#productCategoryDetailModalContent').html(html);
    $('#productCategoryDetailModal').modal('toggle');
}

$('#category_add_form').submit( ( event ) => {
    event.preventDefault();

    const c_name = $("#cat_name").val();

    const obj = {
        name: c_name
    }

    $.ajax({
        url: '/specifications/category/add',
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'JSON',
        contentType : 'application/json; charset=utf-8',
        success: function (data) {
            if ( data !== "0" ) {
                console.log(data);
                getAllCategories();
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

function deleteCategory(id) {
    let answer = confirm("Silmek istediðinizden emin misniz?");

    if(answer){
        $.ajax({
            url: '/specifications/category/delete/' + id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType : 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data)
                if ( data === 1 ) {
                    console.log(data);
                    getAllCategories();
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
