# Localízame

## What is it

A very opinionated open-source tool to generate Android, iOS and Angular code, ready to import in your project, from a .xslx template of i18n terms.

You can run it locally as web application, you need to run the back and front.

## Live Demo

[**Fully functional demo**](https://opensource.mercadona.com/localizame)

(Courtesy spot instance at GCP, if it is unresponsive it means it will be rebooting for a minute or two 😄)

## How it works

The way it works is pretty simple, the input is an xlsx file with one sheet. The sheet has different information in each column. The first column are the string keys and the other ones are the translations to different languages, as many as you like.

### Step 1

Drag the file to the load area. [Example input file](./examples/example_input.xlsx)

![Drag the file to the load area](./examples/to_upload.gif)

### Step 2

Select the platforms you'll like to i18n and click download. [Example output file (Android & iOS)](./examples/example_output.zip)

![Drag the file to the load area](./examples/to_download.gif)

And **Bualá!**, the downloaded .zip file contains the code you need to add to your project to consume the translations.

## How to run

```bash
npm install && npm run dev

## Feedback

If you like to send us feedback, raise an idea or just share how you use it you can use [issues](https://github.com/mercadonait/localizame/issues) to communicate with us and the community.

## License, expertise and contributions

Localízame is developed under the [Apache license](https://github.com/MercadonaIT/localizame/blob/main/LICENSE) therefore you can help to make it grow. We really will love to know from you and have you on board!

[Learn how to contribute to Localízame](./CONTRIBUTING.md)

## Work with us

If you like this project and you want to know more about what we do tell us to [Mercadona IT Opensource](mailto:opensource@mercadona.com)

If you want to work with us and help us in our mission apply here: [Mercadona IT Jobs](https://mercadona.avature.net/es_ES/Careers/SearchJobs/IT?3_60_3=243)