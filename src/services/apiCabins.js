import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(`Cabins would not be loaded`);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // creating a unique name for an image, and deleting all the slashes to be sure not to create any sub folders
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://jtdcnxpcpvrnvwenuknz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1) Create/Edit cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id)
    query = query
      // this will work, bcs the newCabin that will come from react form will have same value names as in the supabase backend
      .insert([{ ...newCabin, image: imagePath }]);

  //B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2) Upload an image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3) Delete the cabin IF there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
