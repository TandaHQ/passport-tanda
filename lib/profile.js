exports = module.exports = function parseProfile(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  var names = json.name.split(' ');
  var givenName = names.shift();
  var familyName = names.pop();
  var middleName = names.join(' ');

  var profile = {
    provider: 'tanda',
    id: json.id,
    displayName: json.name,
    name: {
      givenName: givenName,
      middleName: middleName,
      familyName: familyName,
    },
    photos: [json.photo],
    timeZone: json.time_zone,
    utcOffset: json.utc_offset,
    organisation: json.organisation,
    organisation_id: json.organisation_id,
    permissions: json.permissions,
    validSubscription: json.valid_subscription,
    userIds: json.user_ids,
    organisations: json.organisations,
    updatedAt: json.updated_at,
  };

  return profile;
};