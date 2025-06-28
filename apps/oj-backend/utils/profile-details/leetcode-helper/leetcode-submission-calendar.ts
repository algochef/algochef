type SubmissionCalendar = Record<string, number>;

const fetchActiveYears = async (username: string): Promise<number[]> => {
  const url = "https://leetcode.com/graphql/";

  const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
        }
      }
    }
  `;

  const variables = { username };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      operationName: "userProfileCalendar",
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  const resData = await res.json();

  const activeYears = resData.data?.matchedUser?.userCalendar?.activeYears;

  if (!activeYears) {
    throw new Error("No submission calendar data found");
  }

  return activeYears;
};

const fetchLeetcodeSubmissionCalendar = async (
  username: string,
  year: number,
): Promise<SubmissionCalendar> => {
  const url = "https://leetcode.com/graphql/";

  const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }
  `;

  const variables = { username, year };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      operationName: "userProfileCalendar",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  const resData = await response.json();

  const calendarData =
    resData.data?.matchedUser?.userCalendar?.submissionCalendar;

  if (!calendarData) {
    throw new Error("No submission calendar data found");
  }
  return JSON.parse(calendarData);
};

export const fetchAllLeetcodeSubmissions = async (
  username: string,
): Promise<SubmissionCalendar> => {
  const activeYears = await fetchActiveYears(username);
  let calendar: SubmissionCalendar = {};
  for (const year of activeYears) {
    const yearCalendar = await fetchLeetcodeSubmissionCalendar(username, year);
    for (const [timestamp, count] of Object.entries(yearCalendar)) {
      calendar[timestamp] = (calendar[timestamp] || 0) + count;
    }
  }
  return calendar;
};

// (async () => {
//     try {
//         // const calendar = await fetchLeetcodeSubmissionCalendar(
//         //     'TerminalWarlord',
//         //     2023
//         // );
//         // console.log(calendar);
//         await fetchAllLeetcodeSubmissions('terminalwarlord');
//     } catch (e) {
//         console.error(e);
//     }
// })();
