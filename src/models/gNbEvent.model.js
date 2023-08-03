module.exports = (sequelize, DataTypes) => {
    const gNbEvent = sequelize.define("gNbEvent", {
        start_time: {
            type: DataTypes.DATETIME
        },
        end_time: {
            type: DataTypes.DATETIME,
            allowNull: true
        },
        cell_id: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        last_time: {
            type: DataTypes.DATETIME,
            allowNull: true
        }
    });
    return gNbEvent;
};