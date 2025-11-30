/**
 * Determines which students are currently on the bus based on event logs.
 * @param {Array} eventLogs - Array of event objects { student_id, action, timestamp }
 * @returns {Array} - List of student_ids currently on the bus.
 */
export function getCurrentPassengers(eventLogs) {
    if (!Array.isArray(eventLogs)) {
        console.warn("getCurrentPassengers: eventLogs is not an array", eventLogs);
        return [];
    }

    const studentStatus = {};

    // Sort logs by timestamp to ensure we process in order
    const sortedLogs = [...eventLogs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    sortedLogs.forEach(log => {
        const { student_id, action } = log;

        if (!student_id || !action) return; // Skip invalid logs

        if (action === 'check_in') {
            studentStatus[student_id] = 'on_bus';
        } else if (action === 'check_out') {
            studentStatus[student_id] = 'off_bus';
        }
    });

    // Filter students who are currently 'on_bus'
    return Object.keys(studentStatus).filter(studentId => studentStatus[studentId] === 'on_bus');
}
