import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Job } from "../../interfaces/job";

export default function Create_Job() {
  const addJob = async () => {
    const newJob: Job = {
      id: 3,
      name: jobName.current ? jobName.current : "",
      starting_location: startingLocation.current
        ? startingLocation.current
        : "",
      ending_location: endingLocation.current ? endingLocation.current : "",
      employer_id: employerId.current ? employerId.current : -999,
      accepted_by: -999,
    };
    const resp = await fetch("/api/create_job", {
      method: "POST",
      body: JSON.stringify({ newJob }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setJobCreated(true);
  };
  const [jobCreated, setJobCreated] = useState(false);
  const router = useRouter();
  const employerId = useRef(null);
  const jobName = useRef(null);
  const startingLocation = useRef(null);
  const endingLocation = useRef(null);
  return (
    <div>
      <h1 className="yellow-header">Creating new job</h1>{" "}
      <p>these should have borders what ever</p>
      <input
        type="text"
        placeholder="Job Name"
        className="simple-text-box"
        ref={jobName}
      />
      <input
        type="text"
        placeholder="Starting Location"
        className="simple-text-box"
        ref={startingLocation}
      />
      <input
        type="text"
        placeholder="Ending Location"
        className="simple-text-box"
        ref={endingLocation}
      />
      <input
        type="text"
        placeholder="Employer ID"
        className="simple-text-box"
        ref={employerId}
      />
      <button
        onClick={() => {
          addJob();
        }}
        className="blue-btn mx-auto"
      >
        Create Job
      </button>
      {jobCreated ? (
        <div>
          <p>Job Created!</p>
          <button
            onClick={() => {
              router.push("/employer_profile/1");
            }}
            className="blue-btn mx-auto"
          >
            Return to profile
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
