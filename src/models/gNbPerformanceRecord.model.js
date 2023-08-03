module.exports = (sequelize, DataTypes) => {
    return sequelize.define("gNbPerformanceRecord", {
        record_type: {
            type: DataTypes.DATETIME
        },
        cell_id: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
    });
};