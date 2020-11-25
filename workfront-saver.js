function initTimesheetAutoSaver() {
    console.log('initTimesheetAutoSaver');

    function initializeBasedOnIframe(tries = 0) {
        if(tries > 5) {
            console.error('iframe not found')
            return;
        }
        console.log('checking for iframe')
        var iframe = document.getElementById('main-frame');
        if(iframe === null) {
            setTimeout(() => initializeBasedOnIframe(tries + 1), 500);
            return;
        }

        var iframeDocument = iframe.contentWindow.document;

        function initializeBasedOnTimeSheetView(tries = 0) {
            var timesheetView = iframeDocument.querySelector('#content-timesheet-view');
            if(tries > 10) {
                console.error('timesheetView not found')
                return
            }
            if(timesheetView === null) {
                setTimeout(() => initializeBasedOnTimeSheetView(tries + 1), 500);
                return;
            }
            setInterval(() => {
                var saveForLater = iframeDocument.querySelector('#CommentPanel menu button.btn-primary');
                if(saveForLater === null) {
                    console.error('saveForLater not found')
                    return;
                }
                if(saveForLater.innerText.toLowerCase() === 'save for later') {
                    console.log('Saving...')
                    saveForLater.click();
                }
            }, 1000);
        }
        initializeBasedOnTimeSheetView();
    }
    initializeBasedOnIframe();
}
setTimeout(() => initTimesheetAutoSaver(), 1000);
