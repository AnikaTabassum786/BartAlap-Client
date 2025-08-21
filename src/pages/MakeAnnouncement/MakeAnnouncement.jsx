
import React from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useAnnouncement from "../../hooks/useAnnouncement";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios()
  const { refetch } = useAnnouncement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      ...data,
      image: user?.photoURL,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post("/announcements", announcement);
      if (res.data.insertedId || res.data.acknowledged) {
        // alert("Announcement submitted successfully!");
        toast.success('Announcement Submitted Successfully!', { position: 'top-right' });
        refetch();
        reset();
      } else {
        // alert("Something went wrong.");
        toast.error("Something went wrong.", {
          position: "top-right",
        });
      }
    } catch (error) {
      // console.error("Error posting announcement:", error);
      // alert("Failed to submit announcement.");
      toast.error("Failed to submit announcement", error, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6  shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>

      {/* Author Info Display */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL}
          alt="Author"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Name */}
        <div>
          <label className="block mb-1 font-medium">Author Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            {...register("name")}
            readOnly
            className="border p-2 w-full"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="border p-2 w-full"
            placeholder="Enter title"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="border p-2 w-full"
            rows={5}
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-100 text-blue-500  hover:bg-blue-200 px-4 py-2 rounded  cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;


