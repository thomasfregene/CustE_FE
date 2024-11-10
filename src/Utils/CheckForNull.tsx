export function IsNullOrEmpty( string: string | null | undefined) {
  
    if (string === null || string === undefined  || string.trim() === "") {
     return true;
    }
     return false;
     }