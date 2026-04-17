const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
export default sendResponse;
//# sourceMappingURL=sendResponse.js.map