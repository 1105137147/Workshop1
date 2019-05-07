
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}

$(function () {
    loadBookData();
});



$("#book_grid").kendoGrid({
    dataSource:
    {
        data: bookData,
        pageSize: 10
    },

    sortable: true,
    pageable: {
        refresh: true,
        pageSizes: true
    },
    columns: [
        { command: ["destroy"], width: "130px" },
        { field: "BookId", title: "書籍編號",width:"100px" },
        { field: "BookCategory", title: "書籍種類", values: bookCategoryList},
        { field: "BookName", title: "書籍名稱", width: 250 },
        { field: "BookAuthor", title: "作者" },
        { field: "BookBoughtDate", title: "購買日期" },
        {
            field: "BookDeliveredDate", title: "送達狀態", width: "130px", template: function (item) {
                if (item.BookDeliveredDate != undefined) {
                    return "<i class=\"fas fa-truck\"></i>";
                } else {
                    return "";
                }

            }
        },
        { field: "BookPrice", title: "金額", attributes: { style: "text-align:right;" },format: "{0:#,}"},
        { field: "BookAmount", title: "數量", attributes: { style: "text-align:right;" } },
        { field: "BookTotal", title: "總計", attributes: { style: "text-align:right;" }, format: "{0:#,}元" },

    ],
    editable: true
});

$(document).ready(function () {
    $(".datepicker").kendoDatePicker({
        format:"yyyy-MM-dd"
    });
});


$(document).ready(function () {
    $(".numeric").kendoNumericTextBox({
        format: "{0:N0}"
    });
});

$(document).ready(function () {

    var myWindow = $("#window"),
        add_book = $("#add_book");

    add_book.click(function () {
        myWindow.data("kendoWindow").center().open();
        add_book.fadeOut();
    });

    function onClose() {
        add_book.fadeIn();
    }
    myWindow.kendoWindow({
        width: "600px",
        title: "新增書籍",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    })
});

$(document).ready(function () {
    var bookCategoryList = [
        { text: "資料庫", value: "database", src: "image/database.jpg" },
        { text: "網際網路", value: "internet", src: "image/internet.jpg" },
        { text: "應用系統整合", value: "system", src: "image/system.jpg" },
        { text: "家庭保健", value: "home", src: "image/home.jpg" },
        { text: "語言", value: "language", src: "image/language.jpg" }
    ];
    $("#book_category").kendoDropDownList(
        {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: bookCategoryList,
            index: 0,
            change: onChange
        });
    function onChange() {
        var book_img_value = $("#book_category").val();
        var book_imgsrc = document.getElementById("book-image");
        book_imgsrc.src = "image/" + book_img_value + ".jpg";
    };
    
});

$(document).ready(function () {
var validator = $("#book_form").kendoValidator().data("kendoValidator"),
    status = $(".status");

$("form").submit(function (event) {
    event.preventDefault();
    if (validator.validate()) {
        status.text("新增成功")
            .removeClass("invalid")
            .addClass("valid");
    } else {
        status.text("新增失敗")
            .removeClass("valid")
            .addClass("invalid");
    }
});
});


$("#searchtext").keyup(function () {
    var val = $('#searchtext').val();
    $("#book_grid").data("kendoGrid").dataSource.filter({
        logic: "or",
        filters: [
            {
                field: "BookName",
                operator: "contains",
                value: val
            },
            {
                field: "BookAuthor",
                operator: "contains",
                value: val
            }
        ],
    });
});