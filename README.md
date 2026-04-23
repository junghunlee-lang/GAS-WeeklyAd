# Google Slides to Google Chat PDF Automator

## Overview
This Google Apps Script automates the process of exporting an active Google Slides presentation as a PDF, saving it to a designated Google Drive folder, and sharing the direct link to a Google Chat space using a webhook. It also automatically appends the current date (YYYYMMDD) to the exported PDF filename.

## Features
* **Custom Menu Integration:** Adds a convenient `Scripts > Share PDF` menu directly inside Google Slides.
* **Automated PDF Conversion:** Converts the active presentation into a PDF document.
* **Dynamic Naming:** Automatically appends the current date (e.g., `Weekly_Ad_20260423.pdf`) to the filename.
* **Organized Storage:** Saves the generated PDF into a specific Google Drive folder instead of your root directory.
* **Auto-Sharing:** Sets the file permissions to "Anyone with the link can view".
* **Google Chat Notification:** Sends a customized message containing the shareable link to a designated Google Chat space via an Incoming Webhook.

## Prerequisites
Before running this script, you will need:
1. A **Google Chat Space** where you have permission to create an Incoming Webhook.
2. A **Google Drive Folder** where you want to store the generated PDFs.

## Setup Instructions

### 1. Get Your IDs and URLs
* **Google Chat Webhook URL:**
  1. Go to your target Google Chat space.
  2. Click the space name at the top -> **Apps & integrations** (or Space settings -> Integrations).
  3. Click **Manage webhooks** -> **Add another**.
  4. Name your webhook and click **Save**. Copy the provided URL.
* **Google Drive Folder ID:**
  1. Open your target folder in Google Drive.
  2. Look at the URL in your browser: `https://drive.google.com/drive/folders/[YOUR_FOLDER_ID]`
  3. Copy the string of characters at the end of the URL.

### 2. Add the Script to Google Slides
1. Open your Google Slides presentation.
2. Go to **Extensions > Apps Script**.
3. Delete any placeholder code and paste the code from `Code.gs`.
4. Click the **Save** icon (💾).

### 3. Configure Script Properties
This script uses Script Properties to securely store your Folder ID and Webhook URL so they aren't hardcoded into the script.

1. In the Apps Script editor, look at the left sidebar and click the **Project Settings** (gear icon ⚙️).
2. Scroll down to the **Script Properties** section and click **Edit script properties**.
3. Click **Add script property** and add the following two properties:
   * Property: `SharedFolderId` | Value: *(Paste your Google Drive Folder ID here)*
   * Property: `GoogleChat` | Value: *(Paste your Google Chat Webhook URL here)*
4. Click **Save script properties**.

## Usage
1. Refresh your Google Slides tab.
2. Wait a few seconds for the **Scripts** menu to appear in the top toolbar.
3. Click **Scripts > Share PDF**.
4. *Note: The very first time you run this, Google will prompt you to authorize the script. Follow the on-screen prompts to grant permissions.*
5. A popup will alert you once the PDF has been successfully created and sent to Google Chat!

## Troubleshooting
* **Error: Missing Properties:** If the script fails, ensure that `SharedFolderId` and `GoogleChat` are spelled exactly as shown in your Script Properties (they are case-sensitive).
* **Unknown User in Chat:** If your bot appears as "Unknown User" in Google Chat, you will need to delete the webhook in Google Chat and create a new one, ensuring you give it a name *before* saving it. Update your `GoogleChat` Script Property with the new URL.
