"use client";

import { useSession } from "next-auth/react";

export default function SessionDebug() {
  const { data: session, status } = useSession();

  return (
    <div className="mt-4 overflow-auto rounded-md bg-gray-100 p-4 text-sm">
      <h3 className="mb-2 font-bold">Session Debug</h3>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {session ? (
        <>
          <p>
            <strong>User:</strong> {session.user?.name || "No name"}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email || "No email"}
          </p>
          <p>
            <strong>Role:</strong> {session.user?.role || "No role"}
          </p>
          <p>
            <strong>ID:</strong> {session.user?.id || "No ID"}
          </p>
          <details>
            <summary className="cursor-pointer text-blue-500">Full Session Data</summary>
            <pre className="mt-2 rounded bg-black p-2 text-white">{JSON.stringify(session, null, 2)}</pre>
          </details>
        </>
      ) : (
        <p className="text-red-500">No session data available</p>
      )}
    </div>
  );
}
