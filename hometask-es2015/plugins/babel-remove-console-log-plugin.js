function isColsoleLog(callee) {
    if (!callee || !callee.object || !callee.property) {
        return false;
    }

    return callee.object.name === 'console'
        && callee.property.name === 'log';
}

module.exports = function ({ types: t }) {
    return {
        visitor: {
            ExpressionStatement(path) {
                if (isColsoleLog(path.node.expression.callee)) {
                    path.remove();
                }
            }
        }
    };
};
