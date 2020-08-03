<template>
  <pre ref="readme">
-----------------------------------------------------------------------
Thank you for using Digital Business Card Generator!
-----------------------------------------------------------------------

Digital Business Card Generator is a free and open-source front-end web application that lets user to quickly generate an interactive and responsive HTML-based digital business card that can be hosted in their website.

Visit https://dbizcard.vercel.app/ for more

-----------------------------------------------------------------------

Follow the instructions given below to get your generated digital business card online


The folder named "{{
      name
    }}" located next to this file ( README.txt ) contains the generated files. This folder will be referred as "dbizcard folder" throughout this document. 



+ I have a personal WordPress website

  - Login to your cPanel account. Locate and open the file manager
  - In the file manager, locate the folder named "public_html" and create a new folder called "vcard" ( or whatever you like ) inside it.
  - Upload the dbizcard folder into the new folder that you have created in the previous step
  - Now your business card should be online at the address https://your-domain.com/vcard/{{
      name
    }}/ and is ready to be shared.


+ My website is maintained by a developer

  - Contact your developer to host the business card for you. Just send them the downloaded package.


+ We are a company. Our website is maintained by a developer / website administrator.

  - Generate as many business cards you may require for your employees. ( optional )
  - Contact your developer / website administrator to host the business cards for you. Just send them the downloaded packages.


+ I'm the developer / administrator of a website

  - Create a folder called "vcard" ( or whatever you like ) in the project"s static folder
  - Move the dbizcard folder inside the "vcard" folder
  - Commit changes and deploy.
  - Now the business card should be online at the address https://your-domain.com/vcard/dbizcard-folder/ and is ready to be shared.


+ I do not have a website

  - You can host your business card using a free hosting services such as Surge ( https://surge.sh ), a static web hosting service.
  - System Requirement:
    - Make sure you have installed Node.js ( https://nodejs.org ) in your system.
  - Instructions for Windows
      1. Install Surge
        - Open Window PowerShell as ADMIN and type the following command to install Surge in your system.
            npm install --global surge
      2. Open File Explorer, create a folder called "vcard" ( or whatever you like ) in your preferred location and move your dbizcard folder inside it.
      3. Within the "vcard" folder, open a PowerShell by selecting "Open PowerShell window here" from the [Shift + Right click] context menu.
      4. Type "surge" and press Enter.
      5. Create a surge account with your email and password.
      6. Edit your domain name and press Enter few times.
      7. Enable HTTPS encryption
        - In the same PowerShell window, run the following command to enable HTTPS for your website. Don"t forget to replace "your-domain" with your actual domain.
            surge --domain https://your-domain.surge.sh
  - Instructions for Linux / Mac
      1. Install Surge
        - Open Terminal and type the following command to install Surge in your system.
            sudo npm install --global surge
      2. Open File Manager, create a folder called "vcard" ( or whatever you like ) in your preferred location and move your dbizcard folder inside it.
      3. Within the "vcard" folder, open a Terminal and type "surge" and press Enter.
      4. Create a surge account with your email and password.
      5. Edit your domain name and press Enter few times.
      6. Enable HTTPS encryption
        - In the same Terminal window, run the following command to enable HTTPS for your website. Don"t forget to replace "your-domain" with your actual domain.
            surge --domain https://your-domain.surge.sh
      7. Now your business card should be online at the address https://your-domain.surge.sh/vcard/businesscardfoldername/ and is ready to be shared.


+ How do I update my business card details?

  - Simply go to the website https://dbizcard.vercel.app/ and generate a new digital business card.
  - Extract the package and copy your dbizcard folder containing your updated files.
  - Replace your old folder with this updated one.
  - Follow the exact same steps as per your category to update your digital business card.


+ How do I add another business card to my website?

  - Simply go to the website https://dbizcard.vercel.app/ and generate a digital business card.
  - Extract the package and copy the dbizcard folder.
  - Place the copied folder inside the same folder where you already have your dbizcard folders.
  - Follow the exact same steps as per your category to add the digital business card.


??????????????????????????????????????

Cannot find what you were looking for?
- You can get help by joining the Telegram group using this link https://t.me/dbizcard

??????????????????????????????????????




</pre>
</template>

<script>
export default {
  props: ['name'],
}
</script>
