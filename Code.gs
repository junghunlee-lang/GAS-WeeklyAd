function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Scripts')
      .addItem('Share PDF', 'shareSlideAsPDF')
      .addToUi();
}

function shareSlideAsPDF(){
  const originalPres = SlidesApp.getActivePresentation();
  const originalId = originalPres.getId();
  const presentationName = originalPres.getName();

  const file = DriveApp.getFileById(originalId);
  const folderId = PropertiesService.getScriptProperties().getProperty('SharedFolderId');
  const todayString = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");

  const lastUpdatedDate = file.getLastUpdated();
  const dayOfWeek = lastUpdatedDate.getDay();
  if(dayOfWeek == 3 || dayOfWeek == 4){
    pdfBlob.setName(`${presentationName}_${todayString}.pdf`);
    const folder = DriveApp.getFolderById(folderId);
    const savedPdfFile = folder.createFile(pdfBlob);
    savedPdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const pdfUrl = savedPdfFile.getUrl();

    const chatWebhookUrl = PropertiesService.getScriptProperties().getProperty('GoogleChat');
    const chatMessage = {
      "text": `Hello! The new weekly ad is ready. You can view the PDF here: \n${pdfUrl}`
    };
    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(chatMessage)
    };  
    UrlFetchApp.fetch(chatWebhookUrl, options);
    
    const ui = SlidesApp.getUi();
    ui.alert('Success', 'The PDF was posted to Google Chat!', ui.ButtonSet.OK);
  }
}

function notifyAd(){
  const chatWebhookUrl = PropertiesService.getScriptProperties().getProperty('GoogleChat');
  const SAFE_WAY = "https://www.safeway.com/weeklyad?pushSection=weeklyAd"
  const SMART_AND_FINAL = "https://www.smartandfinal.com/sm/pickup/rsid/522/circular"
  const chatMessage = {
    "text": `Weekly Ads \nSafe Way: ${SAFE_WAY} \nSmart and Final: ${SMART_AND_FINAL}`
  };
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(chatMessage)
  };  
  UrlFetchApp.fetch(chatWebhookUrl, options);
}
