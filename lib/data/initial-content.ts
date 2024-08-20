export const initialContent = {
  title: "The Art of Markdown: A Beginner's Guide",
  content: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Introduction',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Markdown is a lightweight markup language that allows you to format text easily. It's widely used for creating ",
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'documentation',
          },
          {
            type: 'text',
            text: ', ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'italic',
              },
            ],
            text: 'README files',
          },
          {
            type: 'text',
            text: ', and even ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
              {
                type: 'italic',
              },
            ],
            text: 'blog posts',
          },
          {
            type: 'text',
            text: ". In this article, we'll explore some basic Markdown syntax.",
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 4,
        },
        content: [
          {
            type: 'text',
            text: 'Task List',
          },
        ],
      },
      {
        type: 'taskList',
        content: [
          {
            type: 'taskItem',
            attrs: {
              checked: true,
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Download the ',
                  },
                  {
                    type: 'text',
                    marks: [
                      {
                        type: 'link',
                        attrs: {
                          href: 'https://campsite.co/desktop/download',
                          target: '_blank',
                          class: 'prose-link',
                        },
                      },
                    ],
                    text: 'Learn Anything App',
                  },
                  {
                    type: 'text',
                    text: ' for a more focused experience. The app also enables native push notifications on macOS and Windows.',
                  },
                ],
              },
            ],
          },
          {
            type: 'taskItem',
            attrs: {
              checked: false,
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: "Add Learn Anything to your phone's home screen for mobile push notifications. See instructions for ",
                  },
                  {
                    type: 'text',
                    marks: [
                      {
                        type: 'link',
                        attrs: {
                          href: 'https://learn-anything.xyz',
                          target: '_blank',
                          class: 'prose-link',
                        },
                      },
                    ],
                    text: 'iOS',
                  },
                  {
                    type: 'text',
                    text: ' and ',
                  },
                  {
                    type: 'text',
                    marks: [
                      {
                        type: 'link',
                        attrs: {
                          href: 'https://learn-anything.xyz/',
                          target: '_blank',
                          class: 'prose-link',
                        },
                      },
                    ],
                    text: 'Android',
                  },
                  {
                    type: 'text',
                    text: '.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Why Use Markdown?',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'There are several reasons to use Markdown:',
          },
        ],
      },
      {
        type: 'orderedList',
        attrs: {
          start: 1,
        },
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Simplicity',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Readability',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Versatility',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Wide adoption',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Basic Syntax',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Text Formatting',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'You can make text ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'bold',
          },
          {
            type: 'text',
            text: ', ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'italic',
              },
            ],
            text: 'italic',
          },
          {
            type: 'text',
            text: ', or ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
              {
                type: 'italic',
              },
            ],
            text: 'both',
          },
          {
            type: 'text',
            text: '. You can also ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'strike',
              },
            ],
            text: 'strike through',
          },
          {
            type: 'text',
            text: ' text.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Lists',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Ordered List',
          },
        ],
      },
      {
        type: 'orderedList',
        attrs: {
          start: 1,
        },
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'First item',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Second item',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Third item',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 4,
        },
        content: [
          {
            type: 'text',
            text: 'Unordered List',
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Apples',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Bananas',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Cherries',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Code',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'You can include ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'inline code',
          },
          {
            type: 'text',
            text: ' or code blocks:',
          },
        ],
      },
      {
        type: 'codeBlock',
        attrs: {
          language: null,
        },
        content: [
          {
            type: 'text',
            text: 'def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Markdown User")',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: 'Color',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "While standard Markdown doesn't support text color, some flavors of Markdown (like GitHub Markdown) allow you to use HTML tags:",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'textStyle',
                attrs: {
                  color: 'rgb(12 94 177)',
                },
              },
            ],
            text: 'This text is blue!',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Conclusion',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Markdown is a powerful tool for formatting text. With these basics, you're well on your way to creating beautifully formatted documents!",
          },
        ],
      },
    ],
  },
}
