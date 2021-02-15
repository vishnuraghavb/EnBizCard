<template>
  <div class="bg-gray-900 mx-auto text-gray-100" style="max-width: 960px">
    <div class="px-4">
      <div class="flex items-start justify-between pt-8">
        <NuxtLink to="/">
          <div
            class="logo w-24"
            v-html="require(`~/assets/icons/logo.svg?include`)"
            title="EnBizCard - An Open-Source Digital Business Card Generator"
          ></div
        ></NuxtLink>
        <a
          class="font-extrabold tracking-wide leading-none flex-shrink-0 p-3 border-2 text-white border-gray-700 rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
          href="https://www.vishnuraghav.com/donate"
          target="_blank"
          >Donate</a
        >
      </div>
      <div id="guide" class="max-w-screen-sm">
        <h1
          class="text-3xl md:text-5xl font-extrabold mt-24 md:mt-48 md:leading-tight"
        >
          Hosting Guide
        </h1>
        <h2 class="mt-8 text-lg md:text-xl w-full md:w-3/4 text-gray-200">
          Please follow the instructions as per your category to get your
          digital business card online.
        </h2>

        <p class="mt-16 border px-4 py-3 rounded border-gray-700">
          Your digital business card files are in the folder you just extracted
          from your downloaded ZIP file. This folder will be referred to as the
          "<span class="font-extrabold">bizcard folder</span>" throughout this
          guide.
        </p>

        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            I have a personal WordPress website
          </h3>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Login to your cPanel account. Locate and open the file manager.
            </li>
            <li>
              In the file manager, locate the folder named "public_html" and
              create a new folder called "vcard" ( or whatever you like ) inside
              it.
            </li>
            <li>
              Upload your bizcard folder into the new folder that you just
              created in the previous step.
            </li>
            <li>
              Now your business card should be online at the address
              https://your-domain.com/vcard/bizcard-folder-name/ and is ready to
              be shared.
            </li>
          </ul>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            My website is maintained by a developer
          </h3>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Contact your developer to host the business card for you. Just
              send them the downloaded ZIP file.
            </li>
          </ul>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            We are a company. Our website is maintained by the IT team
          </h3>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Just share the details with your IT team, let them create digital
              business cards for you using
              <NuxtLink
                to="/"
                class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
                >EnBizCard</NuxtLink
              >.
            </li>
            <li>
              If you got some business cards created by yourself, contact your
              IT team to host it for you. Just send them the downloaded ZIP
              files and share the link to this
              <a
                class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
                href="https://enbizcard.vercel.app/hosting-guide"
                target="_blank"
                >Hosting Guide</a
              >.
            </li>
          </ul>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            I'm the developer / administrator of a website
          </h3>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Create a folder called "vcard" ( or whatever you like ) in the
              project's static folder.
            </li>
            <li>Copy the bizcard folder inside the "vcard" folder.</li>
            <li>Commit changes and deploy.</li>
            <li>
              Now the business card should be online at the address
              https://your-domain/vcard/bizcard-folder/ and is ready to be
              shared.
            </li>
          </ul>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">I don't have a website</h3>
          <p class="mt-6">
            You can host your digital business card using several free hosting
            services available such as
            <a
              class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
              href="https://surge.sh"
              target="_blank"
              rel="noopener noreferrer"
              >Surge</a
            >,
            <a
              class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              >GitHub Pages</a
            >,
            <a
              class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
              href="https://docs.gitlab.com/ee/user/project/pages/"
              target="_blank"
              rel="noopener noreferrer"
              >GitLab Pages</a
            >, etc.
          </p>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Follow the user guide of any of the services mentioned above to
              setup a website.
            </li>
            <li>
              Once done, copying your bizcard folder into a respective folder is
              all it needed to get your digital business card online. But the
              procedure might vary with platform.
            </li>
          </ul>
          <p class="mt-4">
            If you got any doubt setting up your digital business card on any of
            these platforms, You can always
            <a
              class="underline text-green-600 font-extrabold hover:text-green-500 focus:text-green-500 transition-colors duration-200"
              href="https://t.me/enbizcard"
              target="_blank"
              rel="noopener noreferrer"
              >join the telegram group</a
            >
            and ask it.
          </p>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            How do I update my business card details?
          </h3>
          <p class="mt-6">
            EnBizCard does not store any data online for you to retrieve it for
            editing. So, every card has to be manually created from scratch.
          </p>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Visit
              <NuxtLink
                to="/"
                class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
                >EnBizCard</NuxtLink
              >
              and generate a new digital business card.
            </li>
            <li>
              Extract the downloaded ZIP file and copy your bizcard folder
              containing your updated files.
            </li>
            <li>
              Follow the exact same steps as per your category listed above to
              update your digital business card.
            </li>
          </ul>
        </div>
        <div class="mt-16">
          <h3 class="font-extrabold text-2xl">
            How do I add another business card to my website?
          </h3>
          <ul class="px-6 mt-6 list-outside list-disc">
            <li>
              Visit
              <NuxtLink
                to="/"
                class="underline font-extrabold text-green-600 hover:text-green-500 focus:text-green-500 transition-colors duration-200"
                >EnBizCard</NuxtLink
              >
              and generate a digital business card.
            </li>
            <li>
              Extract the downloaded ZIP file and copy the bizcard folder.
            </li>
            <li>
              Follow the exact same steps as per your category listed above to
              add the digital business card.
            </li>
            <li>
              Place the copied folder inside the same folder where you already
              have your bizcard folders.
            </li>
          </ul>
        </div>
      </div>
      <Help />
      <div class="mt-24">
        Help me improve this guide on
        <a
          class="underline text-green-600 font-extrabold hover:text-green-500 focus:text-green-500 transition-colors duration-200"
          href="https://github.com/vishnuraghavb/EnBizCard"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import Help from '@/components/Help'

export default {
  components: {
    Footer,
    Help,
  },
}
</script>