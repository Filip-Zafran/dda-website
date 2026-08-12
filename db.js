import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const visitsFile = path.resolve(
  process.env.VISITS_DATA_FILE || "data/visits.json",
);

let updateQueue = Promise.resolve();

async function readVisits() {
  try {
    const stored = JSON.parse(await readFile(visitsFile, "utf8"));

    return {
      total: Number.isSafeInteger(stored.total) ? stored.total : 0,
      visitors: Array.isArray(stored.visitors) ? stored.visitors : [],
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return { total: 0, visitors: [] };
    }

    throw error;
  }
}

async function writeVisits(visits) {
  await mkdir(path.dirname(visitsFile), { recursive: true });
  const temporaryFile = `${visitsFile}.${process.pid}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(visits, null, 2)}\n`, "utf8");
  await rename(temporaryFile, visitsFile);
}

export function recordVisit(visitorHash) {
  const update = updateQueue.then(async () => {
    const visits = await readVisits();
    visits.total += 1;

    if (!visits.visitors.includes(visitorHash)) {
      visits.visitors.push(visitorHash);
    }

    await writeVisits(visits);
    return { total: visits.total, unique: visits.visitors.length };
  });

  // Keep future updates running even if this particular disk write fails.
  updateQueue = update.catch(() => {});
  return update;
}

export async function getVisitCounts() {
  await updateQueue;
  const visits = await readVisits();
  return { total: visits.total, unique: visits.visitors.length };
}
