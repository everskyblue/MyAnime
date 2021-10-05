"use strict";
/**
 * @link https://blog.stevenlevithan.com/archives/parseuri
 * parseUri 1.2.2
 * (c) Steven Levithan <stevenlevithan.com>
 * MIT License
 */
Object.defineProperty(exports, "__esModule", { value: true });
parseUri.options = {
    strictMode: false,
    key: ["source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};
function parseUri(str) {
    var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
    while (i--)
        uri[o.key[i]] = m[i] || "";
    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1)
            uri[o.q.name][$1] = $2;
    });
    return uri;
}
exports.default = parseUri;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VVcmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGFyc2VVcmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILFFBQVEsQ0FBQyxPQUFPLEdBQUc7SUFDakIsVUFBVSxFQUFFLEtBQUs7SUFDakIsR0FBRyxFQUFFLENBQUMsUUFBUTtRQUNaLFVBQVU7UUFDVixXQUFXO1FBQ1gsVUFBVTtRQUNWLE1BQU07UUFDTixVQUFVO1FBQ1YsTUFBTTtRQUNOLE1BQU07UUFDTixVQUFVO1FBQ1YsTUFBTTtRQUNOLFdBQVc7UUFDWCxNQUFNO1FBQ04sT0FBTztRQUNQLFFBQVEsQ0FBQztJQUNYLENBQUMsRUFBRTtRQUNELElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSwyQkFBMkI7S0FDcEM7SUFDRCxNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUseUlBQXlJO1FBQ2pKLEtBQUssRUFBRSxrTUFBa007S0FDMU07Q0FDRixDQUFDO0FBRUYsU0FBd0IsUUFBUSxDQUFFLEdBQUc7SUFDbkMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFDeEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ3hELEdBQUcsR0FBRyxFQUFFLEVBQ1IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVQLE9BQU8sQ0FBQyxFQUFFO1FBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNyRCxJQUFJLEVBQUU7WUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFkRCwyQkFjQyJ9