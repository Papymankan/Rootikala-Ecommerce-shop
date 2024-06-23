export default String.prototype.EntoFa = function () {
    return this.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}