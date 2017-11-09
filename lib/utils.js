import axios from "axios";

const objectToFormData = (obj, form, namespace) => {
  let fd = form || new FormData();
  let formKey;

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

export const uploadImage = (uploadData, image, onUpload) => {
  let data = {
    medium: {
      attachment: image,
      ...uploadData
    }
  };
  if (image.type.indexOf("image/") === 0) {
    axios
    .post("http://localhost:3000/media", objectToFormData(data))
    .then(response => {
      onUpload(response);
    });
  }
};