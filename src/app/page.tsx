'use client';
import styles from "./page.module.css";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    function onViewCallendar() {
        router.push("/fullcalendar");
    }

    return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className="d-flex w-100 justify-content-center">
            <div className="w-100" style={{textAlign:"center"}}>
                <h1>Fullcallendar POC</h1>
                <button
                    className={"btn btn-success"}
                    style={{padding: "10px"}}
                    onClick={onViewCallendar}
                >
                    View calendar
                </button>
            </div>

        </div>
      </main>
    </div>
  );
}
