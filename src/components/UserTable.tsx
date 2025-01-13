import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserInfo } from "../types/userInfo";

function UserTable({ tableData }: { tableData: Array<UserInfo> }) {
  function createTableHeaders(data: Array<UserInfo>): string[] {
    if (data && data.length) {
      const headers = Object.keys(data[0]);
      return headers.map((header) => {
        return header.charAt(0).toUpperCase() + header.slice(1);
      });
    }
    return [];
  }

  const tableHeaders = createTableHeaders(tableData);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders?.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserTable;
