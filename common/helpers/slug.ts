export class Slug { 
  static convertToSlug(slug : string) : string {
    const convert = slug.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
    return convert
  }
}