import settings from './settings';

/** encodeUriQuery encodes a string for use in a query parameter */
function encodeUriQuery(val) {
  return encodeURIComponent(val).replace(/%20/g, '+');
}

/**
 * Queries the Hypothesis service that provides
 * statistics about the annotations for a given URL.
 */
export function query(uri) {
  return fetch(settings.apiUrl + '/badge?uri=' + encodeUriQuery(uri), {
    credentials: 'include',
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (typeof data.total !== 'number') {
        throw new Error('Annotation count is not a number');
      }
      return data;
    });
}
