// Downloads table from server
function download() {
    var file_name = 'data.xml';
    $.ajax({
        url: file_name,
        dataType: "text",
        success: function (data) {
            //var _table = $("#main_table");
            var _table = $("#main_id");
            _table.empty();
            _table.append(data);
        }
    });
}


// Uploads table to server
function upload() {
    //var xmlDoc = document.getElementsByTagName('table')[0].innerHTML;
    var xmlDoc = $("#main_id")[0].innerHTML;
    //alert(xmlDoc);
    var post_data = {
        'file_data': xmlDoc
    };

    $.ajax({
        type: "POST",
        url: "http://localhost/WebDesignLab3/server_part.php",
        data: post_data,
        success: function () {
            //alert('success');
            return false;
        }
    });
}


// Deletes table row
function delete_tr(obj) {
    var idx = obj.parentNode.rowIndex;
    $('table')[0].deleteRow(idx);
    upload();
    rowIndex = -1;
    $('.left')[0].value = 'Integer';
    type_changed();
    upload();
}


// Items of list
var list_for_select = ["USA", "UK", "Germany", "Italy", "Japan", "France", "Canada", "Ukraine"];


// Change right field when left changed
function type_changed() {
    var input_label = $('#right')[0];
    var type = $('.left')[0];

    input_label.removeChild(input_label.childNodes[1]);
    var firstChild = input_label.childNodes[1];
    input_label.removeChild(input_label.childNodes[1]);

    if (type.value == 'From List') {
        var selectList = document.createElement("select");

        for (var i = 0; i < list_for_select.length; i++) {
            var option = document.createElement("option");
            option.value = list_for_select[i];
            option.text = list_for_select[i];
            selectList.appendChild(option);
        }
        selectList.className = 'left';
        input_label.appendChild(selectList);

    }
    else {
        var inputField = document.createElement("input");
        inputField.type = 'text';
        inputField.className = 'input_data';
        inputField.placeholder = 'Enter your data';
        var str = inputField.outerHTML;

        //alert(str);
        //alert('12345');
        input_label.appendChild(inputField);
        inputField.innerHTML = inputField.innerHTML.substr(0, inputField.innerHTML.length - 1) + '/>';
    }
    input_label.appendChild(firstChild);
}


// Ads new row to table
function add_tr(obj) {
    var type = $('.left')[0];
    var table = $('table')[0];
    var parent = obj.parentNode;

    var stringValue;
    var can_add_row = false;

    if (type.value == 'Integer') {
        stringValue = $('.input_data')[0].value;
        if (!isNaN(parseInt(stringValue))) {
            can_add_row = true;
        }
    } else if (type.value == 'String') {
        stringValue = $('.input_data')[0].value;
        if (stringValue != '')
            can_add_row = true;
    } else if (type.value == 'From List') {
        var input_label = $('#right')[0];
        stringValue = input_label.childNodes[1].value;
        if (stringValue != '')
            can_add_row = true;
    }

    if (can_add_row) {
        var row = table.insertRow(parent.rowIndex);
        var cell1 = row.insertCell(0);
        cell1.className = 'cell';
        cell1.innerHTML = type.value;

        var cell2 = row.insertCell(1);
        cell2.className = 'cell';
        cell2.innerHTML = stringValue;

        var cell3 = row.insertCell(2);
        cell3.className = 'delete';
        cell3.innerHTML = 'Delete';

        var cell4 = row.insertCell(3);
        cell4.className = 'edit';
        cell4.innerHTML = 'Edit';
    }

    type.value = 'Integer';
    type_changed();
    upload();
    rowIndex = -1;
}


// Intercepts click and either delete or edit some row
function process_click(e) {
    if (e.toElement.className == 'delete')
        delete_tr(e.toElement);
    else if (e.toElement.className == 'edit')
        prepare_for_edit(e.toElement);
}


var rowIndex = -1;   // Index of row we editing
// Copy right data from edited row to lower
function prepare_for_edit(obj) {
    var dropList = $('.left');
    var type = dropList[0];
    var table = $('table')[0];

    rowIndex = obj.parentNode.rowIndex;

    type.value = table.rows[rowIndex].cells[0].innerHTML;
    type_changed();
}


// Edits row in table
function edit_tr(obj) {
    if (rowIndex != -1) {
        var type = $('.left')[0];
        var table = $('table')[0];

        var stringValue;
        var can_edit_row = false;

        if (type.value == 'Integer') {
            stringValue = $('.input_data')[0].value;
            if (!isNaN(parseInt(stringValue))) {
                can_edit_row = true;
            }
        } else if (type.value == 'String') {
            stringValue = $('.input_data')[0].value;
            if (stringValue != '')
                can_edit_row = true;
        } else if (type.value == 'From List') {
            var input_label = $('#right')[0];
            stringValue = input_label.childNodes[1].value;
            if (stringValue != '')
                can_edit_row = true;
        }

        if (can_edit_row) {
            table.rows[rowIndex].cells[0].innerHTML = type.value;
            table.rows[rowIndex].cells[1].innerHTML = stringValue;
        }

        type.value = 'Integer';
        type_changed();
        upload();
    }
}