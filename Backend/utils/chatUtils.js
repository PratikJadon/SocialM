exports.getOtherMemeber = (members = [], userId) => {
    return members.filter((member) => member.id !== userId)
}