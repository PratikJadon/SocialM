exports.getOtherMemeber = (members = [], userId) => {
    return members.filter((member) => (typeof member === 'object' ? member?.id : member) !== userId);
}
