// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable, { FieldSet, Records } from "airtable";

interface IGetClassOption {
  baseName: string;
  student: string;
}
interface IGetStudentsOption {
  baseName: string;
  // Set type to any here because recordIds type from Airtable is a readonly string[]
  recordIds: string[] | any;
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const baseKey = process.env.NEXT_PUBLIC_BASE_KEY as string;

const base = new Airtable({ apiKey }).base(baseKey);

export const getClass = ({ baseName, student }: IGetClassOption) => {
  return base(baseName)
    .select({
      filterByFormula: `FIND("${student}", {Name})`,
    })
    .firstPage();
};

export const getRecordsById = ({
  baseName,
  recordIds,
}: IGetStudentsOption): Promise<Records<FieldSet>> => {
  const records = Promise.all(
    recordIds.map(async (id: string) => {
      const response = await base(baseName).find(id);
      return response;
    })
  );
  return records;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const student = JSON.parse(req.body);
  const data = await getClass({ baseName: "Students", student });
  const classIds = data.map((item) => item.fields.Classes);

  const classes = await Promise.all(
    classIds.map(async (ids) => {
      const courseIds = await getRecordsById({
        baseName: "Classes",
        recordIds: ids,
      });
      const student = await Promise.all(
        courseIds.map(async (item) => {
          const recordIds = item.fields.Students;
          const className = item.fields.Name;
          const student = await getRecordsById({
            baseName: "Students",
            recordIds,
          });
          return {
            name: className,
            students: student.map((item) => item.fields.Name),
          };
        })
      );
      return student;
    })
  );

  res.json(classes.flat());
}
