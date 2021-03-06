wc.input = (function() {
    var self = {};

    $(function() {
        var history = [],
        historyPos = 0,
        $input = $('#footer input');

        $input.keydown(function(e) {
            var line, currentPos = historyPos;
            switch (e.keyCode) {
            case 13:
                line = $input.val();
                if (line.length > 0) {
                    $input.val('');
                    history.push(line);
                    historyPos = history.length;

                    wc.socket.emit('msg', {
                        id: wc.buffers.current,
                        line: line
                    });
                }
                return false;
            case 38:
                historyPos--;
                break;
            case 40:
                historyPos++;
                break;
            }
            if (historyPos < 0) {
                historyPos = 0;
            } else if (historyPos > history.length) {
                historyPos = history.length;
            }

            if (currentPos !== historyPos) {
                $input.val(history[historyPos]);
                return false;
            }
        });
    });

    return self;
})();

