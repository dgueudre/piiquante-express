/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = "dg-ocr-web-p6.appspot.com";

// The path to your file to upload
const filePath = "public\\images\\100_2464.jpg1662305278364.jpg";

// The new ID for your GCS file
const destFileName = "100_2464.jpg1662305278364.jpg";

// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();

async function uploadFile() {
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: { ifGenerationMatch: 0 },
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

// uploadFile().then(console.log).catch(console.error);

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The ID of your GCS file
// const fileName = 'your-file-name';

// The path to which the file should be downloaded
// const destFileName = '/local/path/to/file.txt';

async function downloadFile() {
  const options = {
    destination: "public\\images\\100_2464.jpg1662305278364---2.jpg",
  };

  // Downloads the file
  await storage
    .bucket(bucketName)
    .file("100_2464.jpg1662305278364.jpg")
    .download(options);

  console.log(`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`);
}

downloadFile().catch(console.error);

async function downloadIntoMemory() {
  // Downloads the file into a buffer in memory.
  const contents = await storage.bucket(bucketName).file(fileName).download();

  console.log(
    `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
  );
}

// downloadIntoMemory().catch(console.error);
