type IconProps = React.SVGProps<SVGSVGElement>;

export default function PaperClipIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_68_25396)">
        <path
          d="M21.4398 11.7456L12.2498 20.9356C11.124 22.0614 9.59699 22.6939 8.0048 22.6939C6.41262 22.6939 4.88565 22.0614 3.7598 20.9356C2.63396 19.8097 2.00146 18.2828 2.00146 16.6906C2.00146 15.0984 2.63396 13.5714 3.7598 12.4456L12.9498 3.25557C13.7004 2.50501 14.7183 2.08334 15.7798 2.08334C16.8413 2.08334 17.8592 2.50501 18.6098 3.25557C19.3604 4.00613 19.782 5.02411 19.782 6.08557C19.782 7.14702 19.3604 8.16501 18.6098 8.91557L9.4098 18.1056C9.03452 18.4808 8.52553 18.6917 7.9948 18.6917C7.46407 18.6917 6.95508 18.4808 6.5798 18.1056C6.20452 17.7303 5.99369 17.2213 5.99369 16.6906C5.99369 16.1598 6.20452 15.6508 6.5798 15.2756L15.0698 6.79557"
          stroke="#1E1E1E"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_68_25396">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.695557)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
