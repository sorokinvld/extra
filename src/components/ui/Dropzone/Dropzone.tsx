import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.css";
import { Roboto } from "@next/font/google";
import axios from "axios";
import { useUser } from "@/lib/userProvider";
import { toast } from "react-toastify";
import { fetchUser } from "@/queries/fetchUser";
import CircularProgress from "@mui/material/CircularProgress";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type T = any;

interface props {
  dd: string;
  ch: string;
  ppu: string;
}

export default function Dropzone({ dd, ch, ppu }: props) {
  const [preview, setPreview] = useState<T & { preview: string }>([]);
  const [file, setFile] = useState<T>();
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setPreview(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFile(acceptedFiles[0]);
    },
  });
  const { setUser, user } = useUser();
  const getMe = async () => {
    const [error, user] = await fetchUser();
    if (!error && user) {
      if (user == "your are not login") {
        setUser(null);
      } else {
        setUser(user);
      }
    } else {
      return;
    }
  };

  const handlePictureUpdate = async () => {
    let formData = new FormData();
    formData.append("image", file);
    await new Promise<void>(async (resolve) => {
      setLoading(true);
      const data = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/updateimage/${user._id}`,
        formData
      );
      const res = await data.data;
      if (res == "image has been updated") {
        toast.success(ppu);
        getMe();
        setFile([]);
        setPreview([]);
        setLoading(false);
        resolve();
      } else {
        toast.error("500 - Internal server error.");
        resolve();
      }
    });
  };

  const thumbs = preview.map((file: any) => (
    <div key={file.name}>
      <div className={styles.thumbInner}>
        <Image
          src={file.preview}
          className={styles.image}
          width={100}
          height={100}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={"Preview image"}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      preview.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [preview]);

  return (
    <div className={styles.containerwrapper}>
      {preview.length == 0 && (
        <section>
          <div {...getRootProps()} className={styles.container}>
            <input {...getInputProps()} />
            <p className={roboto.className}>{dd}</p>
            <p className={roboto.className}>{ch}</p>
          </div>
        </section>
      )}
      {preview.length > 0 && (
        <div className={styles.preview}>
          <aside className={styles.thumbContainer}>{thumbs}</aside>
          <div className={styles.buttons}>
            {loading ? (
              <CircularProgress sx={{ color: "grey" }} />
            ) : (
              <>
                <button
                  className={styles.updatebtn}
                  onClick={handlePictureUpdate}
                >
                  <span className={roboto.className}>Update</span>
                </button>
                <button
                  className={styles.cancelbtn}
                  onClick={() => setPreview([])}
                >
                  <span className={roboto.className}>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
