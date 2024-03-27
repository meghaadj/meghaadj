/**
 * Helper function for comparing the changes of two objects.
 * @param {object} old - The user object associated with the action.
 * @param {object} latest - The submission object to which the audit trail is applied.
 * @returns {array} - The array of changes.
 */
const changeLog = (old, latest) => {
  const arr = [];

  // Helper function to recursively compare nested objects and arrays
  const compareNestedObjects = (obj1, obj2, path) => {
    for (const key in obj2) {
      const fullPath = path ? `${path}.${key}` : key;

      const val1 = obj1[key];
      const val2 = obj2[key];

      if (val1 === null && val2 !== null) {
        arr.push(`Changed ${fullPath}: ${val1} => ${val2}`);
      }

      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          arr.push(`Changed ${fullPath}: ${val1} => ${val2}`);
        }
      } else if (typeof val1 === "object" && typeof val2 === "object") {
        compareNestedObjects(val1, val2, fullPath);
      } else {
        if (val1 !== val2) {
          arr.push(`Changed ${fullPath}: ${val1} => ${val2}`);
        }
      }
    }
  };

  compareNestedObjects(old, latest, "");

  return arr;
};

export default changeLog;
