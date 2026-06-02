export interface SocialLink {
  name: string;
  url: string;
  display: string;
}

export const socials = {
  email: 'kimkh05.dev@gmail.com',
  phone: '010-3312-5024',
  github: {
    name: 'GitHub',
    url: 'https://github.com/rlarudgh',
    display: 'github.com/rlarudgh',
  } as SocialLink,
  linkedin: {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/kimkh05',
    display: 'linkedin.com/in/kimkh05',
  } as SocialLink,
};
