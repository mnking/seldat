containerPaste = {

    newLine: '\n',
    message: {
        'notEnoughRows': 'Current row in table is not enough. Please add more'
    },

    init: function() {
        var self = containerPaste;
        var table = $('#scanContainerTable');

        $('input', table).bind('paste', function(e) {
            var element = $(this);
            var data = self.getCopiedData(e);
            // Current rows in table is enough to paste
            var isEnoughRow = self.checkEnoughRow(data);

            if (isEnoughRow) {
                self.paste(element, data);
            }

            return false;
        });
    },

    paste: function(element, data) {
        var columnIndex = containerPaste.getColumnIndex(element);
        var rowIndex = containerPaste.getRowIndex(element);

        $.each(data, function(index, value) {
            var pasteIndex = rowIndex -1 + index;
            var rowElement = $('#scanContainerTable .batchRows').eq(pasteIndex);
            var columnElement = $('td', rowElement).eq(columnIndex);
            $('input', columnElement).val(value);
        });
    },

    getColumnIndex: function(element) {
        return element.closest('td').index();
    },

    getRowIndex: function(element) {
        return element.closest('tr').index();
    },

    getCopiedData: function(e) {
        var copied = e.originalEvent.clipboardData.getData('Text');
        var data = copied.split(this.newLine);
        //remove last array element if it empty in some copy case
        return containerPaste.removeEmptyElement(data);
    },

    removeEmptyElement: function(data) {
        var last = data[data.length - 1];

        if (! last) {
            data.pop();
        }
        return data;
    },

    checkEnoughRow: function(data) {
        var rows = $('#scanContainerTable .batchRows').length;
        var copiedRows = data.length;

        if (copiedRows > rows) {
            defaultAlertDialog(this.message.notEnoughRows);
            return false;
        }

        return true;
    }
};